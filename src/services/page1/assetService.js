import axios from "axios";
import { serverApi } from "../../lib/config";

/****************ASSET DATA LIST***************** */
export const getAllAssetLists = async () => {
  try {
    const response = await axios.get(`${serverApi}/api/getAllAssetLists/`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    await errorAlert(err?.message);
    // loading = false;
  }
};

export const setAssetUnActivate = async (uuid) => {
  try {
    // Send request to server to unactivate the asset
    const response = await axios.post(
      `${serverApi}/api/setAssetUnActivate/`,
      {
        ass_uuid: uuid,
      },
      {
        withCredentials: true,
      },
    );

    const data = response.data;

    // If successful, return success
    if (data.RESULT !== "ERROR") {
      return { success: true };
    } else {
      throw new Error(`Error Code: ${data.CODE}`);
    }
  } catch (error) {
    throw error;
  }
};

export const setAssetActivate = async (uuid) => {
  try {
    // Send request to server to unactivate the asset
    const response = await axios.post(
      `${serverApi}/api/setAssetActivate/`,
      {
        ass_uuid: uuid,
      },
      {
        withCredentials: true,
      },
    );

    const data = response.data;

    // If successful, return success
    if (data.RESULT !== "ERROR") {
      return { success: true };
    } else {
      throw new Error(`Error Code: ${data.CODE}`);
    }
  } catch (error) {
    throw error;
  }
};

/***********CREATE ASSET GROUP*************** */
export const getAssetGroup = async () => {
  try {
    const response = await axios.get(`${serverApi}/api/getAssetGroup/`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    await errorAlert(err?.message);
    // loading = false;
  }
};

export const setNewAssetGroup = async (asset_group_name) => {
  try {
    // Send request to server to unactivate the asset
    const response = await axios.post(
      `${serverApi}/api/setNewAssetGroup/`,
      {
        asset_group_name: asset_group_name,
      },
      {
        withCredentials: true,
      },
    );

    const data = response.data;

    // If successful, return success
    if (data.RESULT !== "ERROR") {
      return { success: true };
    } else {
      throw new Error(`Error Code: ${data.CODE}`);
    }
  } catch (error) {
    throw error;
  }
};

/**ASSET DETAIL INFORMATION */

export const getDetailInformationOfAsset = async (uuid) => {
  try {
    const response = await axios.post(
      `${serverApi}/api/getDetailInformationOfAsset/`,
      {
        asset_uuid: uuid,
      },
      { withCredentials: true },
    );

    if (response.data.RESULT === "OK") {
      return response.data.CODE; // Return the data from the API
    } else {
      throw new Error(
        `Error Code on getDetailInformationOfAsset: ${response.data.CODE}`,
      );
    }
  } catch (error) {
    throw new Error(`Failed to fetch asset detail: ${error.message}`);
  }
};
/******ASSET GROUP CHANGE***** */
export const setAssetGroupChange = async (
  uuid, // Ensure this is an array of UUID strings
  current_group_index,
  next_group_index,
  move_option,
) => {
  console.log("uuid_asset", uuid); // Log the UUID array to check if it's being passed correctly
  console.log("asset_group_index", current_group_index);
  console.log("selectedGroupIndex", next_group_index);
  console.log("moving_option", move_option);

  try {
    const response = await axios.post(
      `${serverApi}/api/setAssetGroupChange/`,
      {
        ast_uuid: uuid, // Send ast_uuid as an array of UUIDs
        current_group_index: current_group_index,
        next_group_index: next_group_index,
        move_option: move_option,
      },
      {
        withCredentials: true,
      },
    );

    if (response.data.RESULT === "OK") {
      console.log("response", response);
      return response; // Return the data from the API
    } else {
      console.log("error", response);
      throw new Error(
        `Error Code on setAssetGroupChange: ${response.data.CODE}`,
      );
    }
  } catch (error) {
    console.error("Error while changing asset group:", error);
    throw new Error(`Failed to fetch asset detail: ${error.message}`);
  }
};

/************* ASSET INFORMATION UPDATE*************** */
export const setAssetInformationUpdate = async (assetInfo) => {
  try {
    const {
      ass_uuid,
      ast_group,
      ast_code,
      ast_usage,
      ast_model,
      ast_brand,
      ast_os,
      ast_ostype,
      ast_application,
      ast_version,
      ast_url,
      ast_hostname,
      ast_real_hostname,
      ast_macaddress,
      ast_ipaddr,
      ast_ipaddrs,
      ast_real_ipaddr,
      ast_location,
      ast_manager_team,
      ast_manager_person,
      ast_operator_team,
      ast_operator_person,
      ast_operator_phone,
      ast_isms_target,
      ast_confidentiality,
      ast_integrity,
      ast_availability,
      ast_security_point,
      ast_security_level,
      ast_etc,
      ast_approve_status,
      ast_activate,
      ast_agent_installed,
    } = assetInfo;
    const response = await axios.post(
      `${serverApi}/api/setAssetInformationUpdate/`,
      {
        ass_uuid,
        ast_group,
        ast_code,
        ast_usage,
        ast_model,
        ast_brand,
        ast_os,
        ast_ostype,
        ast_application,
        ast_version,
        ast_url,
        ast_hostname,
        ast_real_hostname,
        ast_macaddress,
        ast_ipaddr,
        ast_ipaddrs,
        ast_real_ipaddr,
        ast_location,
        ast_manager_team,
        ast_manager_person,
        ast_operator_team,
        ast_operator_person,
        ast_operator_phone,
        ast_isms_target,
        ast_confidentiality,
        ast_integrity,
        ast_availability,
        ast_security_point,
        ast_security_level,
        ast_etc,
        ast_approve_status,
        ast_activate,
        ast_agent_installed,
      },
      {
        withCredentials: true,
      },
    );

    if (response.data.RESULT === "OK") {
      return { success: true }; // Return the data from the API
    } else {
      throw new Error(
        `Error Code on setAssetInformationUpdate: ${response.data.CODE}`,
      );
    }
  } catch (error) {
    throw new Error(`Failed to fetch asset detail: ${error.message}`);
  }
};

/******setAssetRegisterChange****************** */

export const setAssetRegisterChange = async (uuid, approve_status) => {
  try {
    const response = await axios.post(
      `${serverApi}/api/setAssetRegisterChange/`,
      {
        asset_uuid: uuid,
        approve_status: approve_status,
      },
      {
        withCredentials: true,
      },
    );

    if (response.data.RESULT === "OK") {
      return response.data; // Return the data from the API
    } else {
      throw new Error(
        `Error Code on setAssetRegisterChange: ${response.data.CODE}`,
      );
    }
  } catch (error) {
    throw new Error(`Failed to fetch asset detail: ${error.message}`);
  }
};
/****** get TARGET SYSTEMLIST *******************/
export const getTargetSystemLists = async () => {
  try {
    const response = await axios.get(`${serverApi}/api/getTargetSystemLists/`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Change the function signature to accept a single payload object
export const setAssetTargetRegister = async (payload) => {
  try {
    const response = await axios.post(
      `${serverApi}/api/setAssetTargetRegister/`,
      payload,
      {
        withCredentials: true,
      },
    );

    if (response.data && response.data.RESULT === "OK") {
      return response.data;
    } else {
      throw new Error(
        `Error Code on setAssetTargetRegister: ${response.data.CODE}`,
      );
    }
  } catch (error) {
    throw new Error(`Failed to register asset target: ${error.message}`);
  }
};

/*********************************************************************************** */

export const getAssetRegisterStatus = async (current_day) => {
  try {
    const response = await axios.post(
      `${serverApi}/api/getAssetRegisterStatus/`,
      {
        curr_day: current_day,
      },
      {
        withCredentials: true,
      },
    );

    if (response.data.RESULT === "OK") {
      return response.data; // Return the data from the API
    } else {
      throw new Error(
        `Error Code on getAssetRegisterStatus: ${response.data.CODE}`,
      );
    }
  } catch (error) {
    throw new Error(`Failed to fetch asset detail: ${error.message}`);
  }
};
/**************************************************************************** */
export const setAssetForNewGroup = async (addingAssetForm) => {
  try {
    const {
      asset_reg_how,
      existed_asset_group_index,
      target_group_index,
      asset_file,
      asset_lists,
    } = addingAssetForm;

    const formData = new FormData();

    formData.append("asset_reg_how", asset_reg_how);
    formData.append("existed_asset_group_index", existed_asset_group_index);
    formData.append("target_group_index", target_group_index);

    if (asset_file) {
      formData.append("asset_file", asset_file);
    }

    // Join UUIDs into a comma-separated string
    const assetListString = asset_lists
      .filter((uuid) => uuid && uuid.trim() !== "")
      .join(",");
    formData.append("asset_lists", assetListString);

    const response = await axios.post(
      `${serverApi}/api/setAssetForNewGroup/`,
      formData,
      {
        withCredentials: true,
      },
    );

    // console.log("response.......", response);
    if (response.data.RESULT === "OK") {
      return { success: true };
    } else {
      return { success: false, message: response.data.CODE };
    }
  } catch (error) {
    throw error;
  }
};

/************************************************************************** */
export const getSearch = async (
  asset_ostype,
  asset_target_registered,
  asset_activate,
) => {
  try {
    const response = await axios.post(
      `${serverApi}/api/getSearchAsset/`,
      {
        asset_ostype: asset_ostype,
        asset_target_registered: asset_target_registered,
        asset_activate: asset_activate,
      },
      {
        withCredentials: true,
      },
    );

    if (response.data.RESULT === "OK") {
      return response.data; // Return the data from the API
    } else {
      throw new Error(`Error Code on getSearch: ${response.data.CODE}`);
    }
  } catch (error) {
    throw new Error(`Failed to  getSearch: ${error.message}`);
  }
};

/********************************************************************************* */
export const setAssetGroupDelete = async (asset_index) => {
  try {
    const response = await axios.post(
      `${serverApi}/api/setAssetGroupDelete/`,
      {
        asset_group: asset_index,
      },
      {
        withCredentials: true,
      },
    );

    const data = response.data;

    if (data.RESULT !== "ERROR") {
      return { success: true };
    } else {
      throw new Error(data.CODE); // Log the error code from the backend
    }
  } catch (error) {
    throw error;
  }
};

export const setAssetDelete = async (ast_uuid, asset_index) => {
  try {
    const response = await axios.post(
      `${serverApi}/api/setAssetDelete/`,
      {
        ast_uuid: ast_uuid,
        asset_group: asset_index,
      },
      {
        withCredentials: true,
      },
    );

    const data = response.data;

    if (data.RESULT !== "ERROR") {
      return { success: true };
    } else {
      throw new Error(data.CODE); // Log the error code from the backend
    }
  } catch (error) {
    throw error;
  }
};
