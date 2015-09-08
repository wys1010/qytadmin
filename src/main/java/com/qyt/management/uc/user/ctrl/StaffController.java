package com.qyt.management.uc.user.ctrl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.helper.MD5Helper;
import com.qyt.management.platform.helper.ValidatorHelper;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.uc.user.domain.Staff;
import com.qyt.management.uc.user.domain.User;
import com.qyt.management.uc.user.service.StaffService;
import com.qyt.management.uc.auth.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.security.access.annotation.Secured;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Arrays;
import java.util.List;

/**
 * Created by Xandy on 2015/2/27.
 */
@Controller
@RequestMapping("uc/user/staffs")
public class StaffController {

    @Autowired
    StaffService staffService;

    @Autowired
    OrganizationService organizationServiceImpl;

    private static final String STAFFS_PAGE_INDEX = "uc/user/staffs/index_staffs";

    private static final String PROFILE_PAGE_INDEX = "uc/user/profile/index_profile";


    @RequestMapping(value = "profile", method = RequestMethod.GET)
    public String profile(HttpServletRequest request) throws Exception {
        return PROFILE_PAGE_INDEX;
    }

    @ResponseBody
    @RequestMapping(value = "getProfile", method = RequestMethod.GET)
    public Staff getProfile(HttpServletRequest request) throws Exception {
        int userId = User.getCurrentUser().getId();
        Staff staff = staffService.selectEntityByIdEx(userId);
        return staff;
    }



    @RequestMapping(value = "index", method = RequestMethod.GET)
    @Secured({"ROLE_UC_STAFFS_SELECT", "ROLE_UC_STAFFS_UPDATE"})
    public String index(HttpServletRequest request) throws Exception {
        return STAFFS_PAGE_INDEX;
    }

    @ResponseBody
    @RequestMapping(value="all",method = RequestMethod.GET)
    public List<Staff> selectAllEntities(){
        return staffService.selectAllEntities();
    }

    @ResponseBody
    @RequestMapping(value="picker",method = RequestMethod.GET)
    public List<Staff> picker(){
        return staffService.picker();
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    @ResponseBody
    public PagingBean selectEntities(PagingBean<Staff> pb, Staff staff) throws Exception {
        decodeBeforeSelect(staff);

        pb.setCondition(staff);

        staffService.selectEntitiesEx(pb);
        return pb;
    }

    private void decodeBeforeSelect(Staff staff) throws UnsupportedEncodingException {
        if (null != staff.getName()) {
            staff.setName(URLDecoder.decode(staff.getName(), "utf8"));
        }

        if (null != staff.getWechat()) {
            staff.setWechat(URLDecoder.decode(staff.getWechat(), "utf8"));
        }
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    @ResponseBody
    public Staff selectEntityById(@PathVariable Integer id) throws Exception {
        Staff staff = staffService.selectEntityByIdEx(id);
        return staff;
    }

    @RequestMapping(value = "add", method = RequestMethod.POST)
    @ResponseBody
    @Secured({"ROLE_UC_STAFFS_UPDATE"})
    public Staff insertEntity(@Valid Staff staff, BindingResult result) throws Exception {
        decodeBeforeSelect(staff);

        ValidatorHelper.validate(result);

        User currUser = User.getCurrentUser();
        staff.setCreatedBy(currUser.getId());
        staff.setUpdatedBy(currUser.getId());

        if (staff.getDisable() == null) {
            staff.setDisable(0);
        }

        staffService.insertEntity(staff);

        return staff;
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT)
    @ResponseBody
    @Secured({"ROLE_UC_STAFFS_UPDATE"})
    public void updateEntity(@Valid Staff staff, BindingResult result, HttpServletRequest request) throws Exception {
        decodeBeforeSelect(staff);

        // 更新并修改密码
        if (null != request.getParameter("changePw") && (Boolean) request.getParameter("changePw").equals("true")) {
            ValidatorHelper.validate(result);
            staff.setPassword(MD5Helper.encode(staff.getPassword()));
        } else {
            ValidatorHelper.validate(result, "password");
            staff.setPassword(null);
        }

        staffService.updateEntity(staff);
    }


    @RequestMapping(value = "deleteStaffInOrgs", method = RequestMethod.DELETE)
    @ResponseBody
    @Secured({"ROLE_UC_STAFFS_UPDATE"})
    public void deleteStaffInOrgs(String ids) throws Exception{
        staffService.deleteStaffInOrgs(ids);
    }


    /**
     * 批量更新
     * @param staffJson
     * @param request
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value = "batch_update", method = RequestMethod.POST)
    @Secured({"ROLE_UC_STAFFS_UPDATE"})
    public void batchUpdateEntity(String staffJson, HttpServletRequest request) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Staff[] objectArray = objectMapper.readValue(staffJson,Staff[].class);
        List<Staff> list = Arrays.asList(objectArray);
        staffService.batchUpdateEntites(list);
    }


    @RequestMapping(value = "resetPassword", method = RequestMethod.POST)
    @ResponseBody
    @Secured({"ROLE_UC_STAFFS_UPDATE"})
    public void resetPassword(Integer staffId) throws Exception {
        Staff staff = new Staff();
        staff.setId(staffId);

        staffService.resetPassword(staff);
    }

    @RequestMapping(value = "transferCustomer", method = RequestMethod.POST)
    @ResponseBody
    @Secured({"ROLE_UC_STAFFS_UPDATE"})
    public void transferCustomer(Integer oldStaffId, Integer transferStaffId) throws Exception {
        staffService.transferCustomer(oldStaffId, transferStaffId);
    }

    @ResponseBody
    @RequestMapping(value = "isExist",method = RequestMethod.POST)
    public boolean isExist(Staff staff) {
        Staff existStaff = staffService.selectByLoginName(staff.getLoginName());

        if (existStaff != null)
            return true;
        else
            return false;
    }
    /**
     * 修改密码
     * @param oldPassword
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "updatePassword", method = RequestMethod.POST)
    public boolean updatePassword(String oldPassword,String password) throws BusinessException {
        int userId = User.getCurrentUser().getId();
        Staff staff = staffService.selectEntityById(userId);
        boolean isOk = MD5Helper.encode(oldPassword).equalsIgnoreCase(staff.getPassword());
        if(isOk){
            staff.setPassword(MD5Helper.encode(password));
        }
        staffService.updatePassword(staff);
        return isOk;
    }

}
