#!/bin/bash

#脚本目录
basedir=`pwd`
dirname $0|grep "^/" >/dev/null
if [ $? -eq 0 ];then
   basedir=`dirname $0`
else
    dirname $0|grep "^\." >/dev/null
    retval=$?
    if [ $retval -eq 0 ];then
        basedir=`dirname $0|sed "s#^.#$basedir#"`
    else
        basedir=`dirname $0|sed "s#^#$basedir/#"`
    fi
fi

mvnworkdir=$basedir/..
outdir=$basedir/../target/jinwaadmin

function confirm() {
  msg=$1
  echo -n $msg
      read need
      case $need in
          yes|y|YES|Y)
          return 1
      ;;
          no|n|NO|N) 
          return 0 
      ;;
          *)
          return 0   
      ;;
      esac
}

function cannext(){
  if [[ $? -eq 0 ]]; then
  	exit 1
  fi
}

function help(){
	echo "useage: publish <type:[test,production]>"
}

function mvnpackage(){
	# mvn
	cd $mvnworkdir
	echo "\n当前目录：$mvnworkdir"

	mvn clean

	mvn package

	RETVAL=$?  
	if [ $RETVAL -eq 0 ]; then  
	    echo "\n打包状态：成功"  
	else  
	    echo "\n打包状态：失败"
	    exit 1
	fi
}

function publish(){
	if [[ $# -ne 1 ]]; then
		echo "useage: publish <destdir>"
		exit 1
	fi
	
	echo "\n发布命令:"
	echo "\t rsync -zvaur --chmod=ug=rwx --chmod=o=rx --delete --exclude 'attached' --progress -e 'ssh -p 22' '$outdir/' $1"

	confirm "\n 发布到服务器?[Y/N]:"

	cannext

	rsync -zvaur --chmod=ug=rwx --chmod=o=rx --delete --exclude 'attached' --progress -e 'ssh -p 22' $outdir/ $1
}


# 参数不正确，显示帮助
if [[ $# -ne 1 ]]; then
	help
    exit 1
fi

#test,production
operation=$1

case $operation in
    test)
    mvnpackage

    echo "\n发布环境：测试环境"
    publish "root@121.199.7.48:/alidata/server/tomcat7/webapps_jinwaadmin/ROOT/"
;;
	production)
	mvnpackage

	echo "\n发布环境：生产环境"
    publish "root@121.199.7.48:/alidata/server/tomcat7/webapps_jinwaadmin/ROOT/"
;;
    *)
    help
    exit 1
;;
esac