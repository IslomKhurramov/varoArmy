import axios from "axios";
import { serverApi } from "../lib/config";

export const getAllPlanLists = async (page_cnt, list_cnt) => {
  try {
    // Send page_cnt and list_cnt in the request body
    const response = await axios.post(
      `${serverApi}/api/getAllPlanLists/`, // API endpoint
      { page_cnt, list_cnt }, // Request body matches Postman structure
      { withCredentials: true } // Additional config
    );

    // console.log("API Response:", response.data);

    if (response) {
      return response.data; // Expected valid response
    } else {
      throw new Error(
        `Error Code on getDetailInformationOfAsset: ${response.data}`
      );
    }
  } catch (error) {
    console.error("API Call Error:", error.message);
    throw new Error(`Failed to fetch asset detail: ${error.message}`);
  }
};

export const getViewPlanResults = async (
  plan_index,
  assessment_target,
  hostname,
  checklist_item_no,
  check_result,
  show_option
) => {
  try {
    // Send page_cnt and list_cnt in the request body
    const response = await axios.post(
      `${serverApi}/api/getViewPlanResults/`, // API endpoint
      {
        plan_index,
        assessment_target,
        hostname,
        checklist_item_no,
        check_result,
        show_option,
      }, // Request body matches Postman structure
      { withCredentials: true } // Additional config
    );

    // console.log("API Response:", response.data);

    if (response.data.RESULT === "OK") {
      return response.data; // Expected valid response
    } else {
      throw new Error(
        `Error Code on getDetailInformationOfAsset: ${response.data}`
      );
    }
  } catch (error) {
    console.error("API Call Error:", error.message);
    throw new Error(`Failed to fetch asset detail: ${error.message}`);
  }
};

export const setResultChanged = async (
  plan_index,
  result_index,
  checklist_index,
  change_result,
  change_option
) => {
  try {
    // Send page_cnt and list_cnt in the request body
    const response = await axios.post(
      `${serverApi}/api/setResultChanged/`, // API endpoint
      {
        plan_index,
        result_index,
        checklist_index,
        change_result,
        change_option,
      }, // Request body matches Postman structure
      { withCredentials: true } // Additional config
    );

    // console.log("API Response:", response.data);

    if (response.data.RESULT === "OK") {
      return response.data; // Expected valid response
    } else {
      throw new Error(
        `Error Code on getDetailInformationOfAsset: ${response.data}`
      );
    }
  } catch (error) {
    console.error("API Call Error:", error.message);
    throw new Error(`Failed to fetch asset detail: ${error.message}`);
  }
};
/*********************************** */
export const getAllCheckList = async () => {
  try {
    // Send the request with proper payload and configurations
    const response = await axios.get(`${serverApi}/api/getAllCheckList/`, {
      withCredentials: true,
    });

    // console.log("API Response:", response.data);

    if (response && response.data) {
      return response.data; // Return the API response data
    } else {
      throw new Error("Invalid response received from the server.");
    }
  } catch (error) {
    console.error("API Call Error:", error.message);
    throw new Error(`Failed to fetch checklist: ${error.message}`);
  }
};
/***********DELETE CHECKLIST ITEM****************** */
export const setDeleteChecklistItem = async (
  checklist_group_no,
  selected_items
) => {
  try {
    // Send page_cnt and list_cnt in the request body
    const response = await axios.post(
      `${serverApi}/api/setDeleteChecklistItem/`, // API endpoint
      {
        checklist_group_no: checklist_group_no,
        selected_items: selected_items,
      }, // Request body matches Postman structure
      { withCredentials: true } // Additional config
    );

    // console.log("API Response:", response.data);

    if (response) {
      return response.data; // Expected valid response
    } else {
      throw new Error(
        `Error Code on getDetailInformationOfAsset: ${response.data}`
      );
    }
  } catch (error) {
    console.error("API Call Error:", error.message);
    throw new Error(`Failed to fetch asset detail: ${error.message}`);
  }
};
export const setNewChecklistGroup = async (source_chk, destion_name) => {
  try {
    // Send page_cnt and list_cnt in the request body
    const response = await axios.post(
      `${serverApi}/api/setNewChecklistGroup/`, // API endpoint
      { source_chk: source_chk, destion_name: destion_name }, // Request body matches Postman structure
      { withCredentials: true } // Additional config
    );

    // console.log("API Response:", response.data);

    if (response) {
      return response.data; // Expected valid response
    } else {
      throw new Error(
        `Error Code on getDetailInformationOfAsset: ${response.data}`
      );
    }
  } catch (error) {
    console.error("API Call Error:", error.message);
    throw new Error(`Failed to fetch asset detail: ${error.message}`);
  }
};

export const setDeleteChecklistGroup = async (checklist_group_no) => {
  try {
    // Send page_cnt and list_cnt in the request body
    const response = await axios.post(
      `${serverApi}/api/setDeleteChecklistGroup/`, // API endpoint
      { checklist_group_no: checklist_group_no }, // Request body matches Postman structure
      { withCredentials: true } // Additional config
    );

    // console.log("API Response:", response.data);

    if (response) {
      return response.data; // Expected valid response
    } else {
      throw new Error(
        `Error Code on getDetailInformationOfAsset: ${response.data}`
      );
    }
  } catch (error) {
    console.error("API Call Error:", error.message);
    throw new Error(`Failed to fetch asset detail: ${error.message}`);
  }
};
/*************************************************************************** */

export const setDeletePlan = async (plan_index) => {
  try {
    // Send page_cnt and list_cnt in the request body
    const response = await axios.post(
      `${serverApi}/api/setDeletePlan/`, // API endpoint
      { plan_index: plan_index }, // Request body matches Postman structure
      { withCredentials: true } // Additional config
    );

    // console.log("API Response:", response.data);

    if (response) {
      return response.data; // Expected valid response
    } else {
      throw new Error(`Error Code on setDeletePlan: ${response.data}`);
    }
  } catch (error) {
    console.error("API Call Error:", error.message);
    throw new Error(`Failed to fetch setDeletePlan detail: ${error.message}`);
  }
};

export const getPlanDetailInformation = async (plan_index) => {
  try {
    // Send page_cnt and list_cnt in the request body
    const response = await axios.post(
      `${serverApi}/api/getPlanDetailInformation/`, // API endpoint
      { plan_index: plan_index }, // Request body matches Postman structure
      { withCredentials: true } // Additional config
    );

    // console.log("API Response:", response.data);

    if (response) {
      return response.data; // Expected valid response
    } else {
      throw new Error(
        `Error Code on getPlanDetailInformation: ${response.data}`
      );
    }
  } catch (error) {
    console.error("API Call Error:", error.message);
    throw new Error(
      `Failed to fetch getPlanDetailInformation detail: ${error.message}`
    );
  }
};

export const getVulnsOfAsset = async (
  plan_index,
  asset_target_uuid,
  step_vuln,
  page_cnt,
  list_cnt,
  search_opt
) => {
  try {
    // Send page_cnt and list_cnt in the request body
    const response = await axios.post(
      `${serverApi}/api/getVulnsOfAsset/`, // API endpoint
      {
        plan_index: plan_index,
        asset_target_uuid: asset_target_uuid,
        step_vuln: step_vuln,
        page_cnt: page_cnt,
        list_cnt: list_cnt,
        search_opt: search_opt,
      }, // Request body matches Postman structure
      { withCredentials: true } // Additional config
    );

    // console.log("API Response:", response.data);

    if (response) {
      return response.data; // Expected valid response
    } else {
      throw new Error(
        `Error Code on getPlanDetailInformation: ${response.data}`
      );
    }
  } catch (error) {
    console.error("API Call Error:", error.message);
    throw new Error(
      `Failed to fetch getPlanDetailInformation detail: ${error.message}`
    );
  }
};

export const setSpecificItemResultsChange = async (data) => {
  try {
    console.log("Sending data:", data);

    // Make the API call with axios, sending FormData as the payload
    const response = await axios.post(
      `${serverApi}/api/setSpecificItemResultsChange/`,
      data,
      {
        withCredentials: true, // Make sure to send credentials if necessary
      }
    );

    console.log("API response:", response);

    // Check if the response contains an error
    if (response?.data?.RESULT === "ERROR") {
      throw new Error(response.data?.CODE);
    }

    return response.data; // Return the data if the request is successful
  } catch (error) {
    console.error("Error during API request:", error);
    throw error; // Rethrow error for further handling
  }
};

export const getUserName = async () => {
  try {
    // Send the request with proper payload and configurations
    const response = await axios.get(`${serverApi}/api/getUserName/`, {
      withCredentials: true,
    });

    // console.log("API Response:", response.data);

    if (response && response.data) {
      return response.data; // Return the API response data
    } else {
      throw new Error("Invalid response received from the server.");
    }
  } catch (error) {
    console.error("API Call Error:", error.message);
    throw new Error(`Failed to fetch checklist: ${error.message}`);
  }
};
export const getVulnsFixWay = async () => {
  try {
    // Send the request with proper payload and configurations
    const response = await axios.get(`${serverApi}/api/getVulnsFixWay/`, {
      withCredentials: true,
    });

    // console.log("API Response:", response.data);

    if (response && response.data) {
      return response.data; // Return the API response data
    } else {
      throw new Error("Invalid response received from the server.");
    }
  } catch (error) {
    console.error("API Call Error:", error.message);
    throw new Error(`Failed to fetch checklist: ${error.message}`);
  }
};

export const setFixPlanRegister = async (
  asset_uuid,
  ccr_index,
  fix_method,
  fix_level,
  fix_start_date,
  fix_end_date,
  fix_comment,
  fix_user_index,
  fix_step_status
) => {
  try {
    // Send page_cnt and list_cnt in the request body
    const response = await axios.post(
      `${serverApi}/api/setFixPlanRegister/`, // API endpoint
      {
        asset_uuid: asset_uuid,
        ccr_index: ccr_index,
        fix_method: fix_method,
        fix_level: fix_level,
        fix_start_date: fix_start_date,
        fix_end_date: fix_end_date,
        fix_comment: fix_comment,
        fix_user_index: fix_user_index,
        fix_step_status: fix_step_status,
      }, // Request body matches Postman structure
      { withCredentials: true } // Additional config
    );

    // console.log("API Response:", response.data);

    if (response) {
      return response.data; // Expected valid response
    } else {
      throw new Error(
        `Error Code on getPlanDetailInformation: ${response.data}`
      );
    }
  } catch (error) {
    console.error("API Call Error:", error.message);
    throw new Error(
      `Failed to fetch getPlanDetailInformation detail: ${error.message}`
    );
  }
};

export const setPlanChange = async (formData) => {
  try {
    console.log("Sending FormData:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    // Send FormData in the request body
    const response = await axios.post(
      `${serverApi}/api/setPlanChange/`,
      formData, // Pass FormData directly
      {
        withCredentials: true,
      }
    );

    if (response?.data) {
      console.log("Response:", response.data);
      return response.data; // Return the actual response data
    } else {
      throw new Error("Unexpected empty response from server.");
    }
  } catch (error) {
    console.error("API Call Error:", error.message);
    throw new Error("Failed to update the plan details: " + error.message);
  }
};
export const getPlanLists = async () => {
  try {
    // Send page_cnt and list_cnt in the request body
    const response = await axios.get(
      `${serverApi}/api/getPlanLists/`, // API endpoint
      { withCredentials: true } // Additional config
    );

    console.log("API Responselist:", response);

    if (response) {
      return response.data; // Expected valid response
    } else {
      throw new Error(
        `Error Code on getDetailInformationOfAsset: ${response.data}`
      );
    }
  } catch (error) {
    console.error("API Call Error:", error.message);
    throw new Error(`Failed to fetch asset detail: ${error.message}`);
  }
};
export const getPlanReportLists = async (plan_index) => {
  try {
    // Send page_cnt and list_cnt in the request body
    const response = await axios.post(
      `${serverApi}/api/getPlanReportLists/`, // API endpoint
      { plan_index }, // Request body matches Postman structure
      { withCredentials: true } // Additional config
    );

    // console.log("API Response:", response.data);

    if (response) {
      return response.data; // Expected valid response
    } else {
      throw new Error(
        `Error Code on getDetailInformationOfAsset: ${response.data}`
      );
    }
  } catch (error) {
    console.error("API Call Error:", error.message);
    throw new Error(`Failed to fetch asset detail: ${error.message}`);
  }
};

export const getFixDoneLists = async (plan_index) => {
  try {
    // Send page_cnt and list_cnt in the request body
    const response = await axios.post(
      `${serverApi}/api/getFixDoneLists/`, // API endpoint
      { plan_index }, // Request body matches Postman structure
      { withCredentials: true } // Additional config
    );

    // console.log("API Response:", response.data);

    if (response) {
      return response.data; // Expected valid response
    } else {
      throw new Error(
        `Error Code on getDetailInformationOfAsset: ${response.data}`
      );
    }
  } catch (error) {
    console.error("API Call Error:", error.message);
    throw new Error(`Failed to fetch asset detail: ${error.message}`);
  }
};
