package com.qyt.management.platform.helper;

/**
 * 控制是否开启Typescript
 *
 * Created by caiwb on 15-1-28.
 */
public class TcHelper {

    public static String Head = "<script type=\"text/javascript\" src=\"";
    public static String Tail = "\"></script>";

    public static String App = "app.js";
    public static String SelectController = "selectController.js";
    public static String EditController = "editController.js";

    public static boolean typescript() {
        return true;
    }

    public static String script(String bathPath, String relativePath, String tsFileName, String ...jsFileNames) {
        StringBuffer buffer = new StringBuffer();

        if (typescript()) {
            buffer.append(Head)
                    .append(bathPath)
                    .append(relativePath)
                    .append(tsFileName)
                    .append(Tail);
        } else {
            if (jsFileNames == null || jsFileNames.length == 0) {
                buffer.append(Head)
                        .append(bathPath)
                        .append(relativePath)
                        .append(App)
                        .append(Tail);

                buffer.append(Head)
                        .append(bathPath)
                        .append(relativePath)
                        .append(SelectController)
                        .append(Tail);

                buffer.append(Head)
                        .append(bathPath)
                        .append(relativePath)
                        .append(App)
                        .append(EditController);
            } else {
                for(String jsFileName : jsFileNames) {
                    buffer.append(Head)
                            .append(bathPath)
                            .append(relativePath)
                            .append(jsFileName)
                            .append(Tail);
                }
            }
        }

        return buffer.toString();
    }
}
