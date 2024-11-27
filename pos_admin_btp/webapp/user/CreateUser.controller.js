sap.ui.define([
    "com/posadminbtp/initial/BaseController",
    "sap/ui/model/json/JSONModel",
    "com/posadminbtp/utils/URLConstants",
    "com/posadminbtp/utils/ErrorMessage",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (
    BaseController, JSONModel, URLConstants, ErrorMessage, MessageBox, MessageToast
) {
    "use strict";

    return BaseController.extend("com.posadminbtp.user.CreateUser", {

        onInit: function () {
            this.oOwnerComponent = this.getOwnerComponent();
            this.oRouter = this.oOwnerComponent.getRouter();
            this.oModel = this.oOwnerComponent.getModel();

            // Attach pattern matched event handlers for routing
            this.oRouter.getRoute("manage_user").attachPatternMatched(this._onRouteMatched, this);
            this.oRouter.getRoute("create_user").attachPatternMatched(this._onRouteMatched, this);
            //Initialize 
            let oSource = ((sId) => this.getView().byId(sId));
            [this.formId, this.pageId, this.popoverBtn] = [oSource('id_form'), oSource('id_createuser'), oSource('errorBtnCrtuser')]
        },
        

        _onRouteMatched: function (oEvent) {
            // Get the user ID from the route, default to 0 if not present
            this._user = oEvent.getParameter("arguments").id || 0;

            // Update generic title for settings model
            let settingsMdl = this.oOwnerComponent.getModel("settings");
            let settingData = settingsMdl.getData();
            settingData.genericTitle = "Users";
            settingsMdl.refresh();

            var setDataModel = {
                system: [
                    { key: "1", text: "System1" },
                    { key: "2", text: "System2" }
                ],
                userType: [
                    { key: "1", text: "Admin" },
                    { key: "2", text: "Editor" },
                    { key: "3", text: "Viewer" },
                    
                ],
                status: [
                    { key: "1", text: "Draft" },
                    { key: "2", text: "Active" },
                    { key: "3", text: "Inactive" },
                    
                ]
            };
            
            
            this.getView().setModel(new JSONModel(setDataModel), "masterdataMdl");
        },
        errorPopoverParams: function () {
            //******Set Initially Empty Error Mdl******
            this.eMdl = this.getOwnerComponent().getModel('errors');
            ErrorMessage.removeValueState([this.formId], this.eMdl);
            this.eMdl.setData([]);
        },
        
        onPressSave() {
            this.errorPopoverParams();
            ErrorMessage.formValidation([this.formId], this.eMdl, this.pageId);
            let valid = this.eMdl.getData();
            if (valid.length == 0) {
 
            } else {
                this.errorHandling();
            }
        },
       

        // Email validation function using regex
        validateEmail: function (email) {
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            return emailPattern.test(email);
        },

      

        onPressCancel: function () {
            this.errorPopoverParams();
            // Navigate back to manage_user view
            this.oRouter.navTo("manage_user", { layout: "OneColumn" });
        },

        handleFullScreen: function () {
            // Switch to full-screen layout
            this.oRouter.navTo("create_user", { layout: "MidColumnFullScreen" });
        },

        handleExitFullScreen: function () {
            // Exit full-screen and expand to two columns layout
            this.oRouter.navTo("create_user", { layout: "TwoColumnsMidExpanded" });
        },

        handleClose: function () {
            this.errorPopoverParams();
            // Close and navigate back to manage_user view
            this.oRouter.navTo("manage_user", { layout: "OneColumn" });
        },

        onExit: function () {
            // Detach pattern matched events on exit
            this.oRouter.getRoute("manage_user").detachPatternMatched(this._onRouteMatched, this);
            this.oRouter.getRoute("create_user").detachPatternMatched(this._onRouteMatched, this);
        },
        onShowPassword(oEvent) {
            let oSource = oEvent.getSource();
            let type = oSource.getType() == 'Text';
            let getIcon = oSource.getValueHelpIconSrc();
            let show = ((oSource) => {
                oSource.setValueHelpIconSrc("sap-icon://show");
                oSource.setType("Password");
            });
            let hide = ((oSource) => {
                oSource.setValueHelpIconSrc("sap-icon://hide");
                oSource.setType("Text");
            });

            if (type) {
                show(oSource);
            } else {
                hide(oSource);
            }

            oSource.setValue(oSource.getValue());

        },
       
      
    });
});
