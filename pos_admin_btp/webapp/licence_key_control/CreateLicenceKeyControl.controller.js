sap.ui.define([
    "com/posadminbtp/initial/BaseController",
    "sap/ui/model/json/JSONModel",
    "com/posadminbtp/utils/URLConstants",
     'com/posadminbtp/utils/ErrorMessage'
], function (
    BaseController, JSONModel, URLConstants,ErrorMessage
) {
    "use strict";

    return BaseController.extend("com.posadminbtp.licence_key_control.CreateLicenceKeyControl", {

        onInit: function () {
            this.oOwnerComponent = this.getOwnerComponent();

            this.oRouter = this.oOwnerComponent.getRouter();
            this.oModel = this.oOwnerComponent.getModel();

            this.oRouter.getRoute("manage_licence_key_control").attachPatternMatched(this._onRouteMatched, this);
            this.oRouter.getRoute("create_licence_key_control").attachPatternMatched(this._onRouteMatched, this);

            let oSource = ((sId) => this.getView().byId(sId));
            [this.formId, this.pageId, this.popoverBtn] = [oSource('from_CLKC'), oSource('creatlicence_page'), oSource('errorBtnCrtLicence')]
        },
        _onRouteMatched: function (oEvent) {
            this._product = oEvent.getParameter("arguments").id || 0;

            let settingsMdl = this.oOwnerComponent.getModel("settings");
            let settingData = settingsMdl.getData();
            settingData.genericTitle = this.getResourceProperty("lkc_licenceKeyControl");
            settingsMdl.refresh();
            var setDataModel = {
				Status: [
					{ key: "1", text: "Draft" },
					{ key: "2", text: "Active" },
					{ key: "3", text: "Inactive" }
				],
				system: [
					{ key: "1", text: "System1" },
					{ key: "2", text: "System2" }
				],
				
			};
			
			
			this.getView().setModel(new JSONModel(setDataModel), "masterdataMdl");
        },
        errorPopoverParams: function () {
            //******Set Initially Empty Error Mdl******
            this.eMdl = this.getOwnerComponent().getModel('errors');
            ErrorMessage.removeValueState([this.formId], this.eMdl);
            this.eMdl.setData([]);
        },
        onPressCancel: function () {
            this.errorPopoverParams();
            this.clearInputFields(); 
            this.oRouter.navTo("manage_licence_key_control", { layout: "OneColumn" });
        },
        handleFullScreen: function () {
            //var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/fullScreen");
            this.oRouter.navTo("create_licence_key_control", { layout: "MidColumnFullScreen"});
        },

        handleExitFullScreen: function () {
            //var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
            this.oRouter.navTo("create_licence_key_control", { layout: "TwoColumnsMidExpanded" });
        },

        handleClose: function () {
            this.errorPopoverParams();
            this.clearInputFields(); 
            //let sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/closeColumn");
            this.oRouter.navTo("manage_licence_key_control", { layout: "OneColumn" });
        },

        onExit: function () {
            this.oRouter.getRoute("manage_licence_key_control").detachPatternMatched(this._onRouteMatched, this);
            this.oRouter.getRoute("licence_key_control_detail").detachPatternMatched(this._onRouteMatched, this);
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
      
        onSystemChange: function (oEvent) {
            this.errorPopoverParams();
            // Get the selected key from the ComboBox
            let selectedSystemID = oEvent.getSource().getSelectedKey();
        
            // Get the input fields using their IDs
            let oInputName = this.getView().byId("inputName");
            let oInputDescription = this.getView().byId("inputDescription");
            let oInputLicenseKey = this.getView().byId("inputLicenseKey");
            let oInputExpirationDate = this.getView().byId("inputExpirationDate");
            let oSelectStatusID = this.getView().byId("selectStatusID");
        
            // Determine if the fields should be enabled or disabled based on the selected key
            if (selectedSystemID === "1") {
                // Enable all fields for System 1
                oInputName.setEditable(true);
                oInputDescription.setEditable(true);
                oInputLicenseKey.setEditable(true);
                oInputExpirationDate.setEditable(true);
                oSelectStatusID.setEditable(true);
            } else if (selectedSystemID === "2") {
                // Enable specific fields for System 2
                oInputName.setEditable(true);
                oInputDescription.setEditable(true); // Example: Disable description for System 2
                oInputLicenseKey.setEditable(true);
                oInputExpirationDate.setEditable(true);
                oSelectStatusID.setEditable(true);
            } else {
                // Disable all fields if no valid system is selected
                oInputName.setEditable(false);
                oInputDescription.setEditable(false);
                oInputLicenseKey.setEditable(false);
                oInputExpirationDate.setEditable(false);
                oSelectStatusID.setEditable(false);
                
                // Optionally, reset field values if disabled
                oInputName.setValue("");
                oInputDescription.setValue("");
                oInputLicenseKey.setValue("");
                oInputExpirationDate.setDateValue(null);
                oSelectStatusID.setSelectedKey("");
            }
        },
        clearInputFields: function () {
            // Clear input fields using their IDscomboSystemID
            let systemID = this.getView().byId("comboSystemID");
            let oInputName = this.getView().byId("inputName");
            let oInputDescription = this.getView().byId("inputDescription");
            let oInputLicenseKey = this.getView().byId("inputLicenseKey");
            let oInputExpirationDate = this.getView().byId("inputExpirationDate");
            let oSelectStatusID = this.getView().byId("selectStatusID");
            
            // Reset values
            systemID.setValue("");
            oInputName.setValue("");
            oInputDescription.setValue("");
            oInputLicenseKey.setValue("");
            oInputExpirationDate.setDateValue(null);
            oSelectStatusID.setSelectedKey("");
            
            // Disable fields after clearing them
            systemID.setEditable(true);
            oInputName.setEditable(false);
            oInputDescription.setEditable(false);
            oInputLicenseKey.setEditable(false);
            oInputExpirationDate.setEditable(false);
            oSelectStatusID.setEditable(false);
        }
        
        

    });
});
