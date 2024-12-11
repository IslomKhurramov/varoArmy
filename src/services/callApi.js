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

    console.log("API Response:", response.data);

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

    console.log("API Response:", response.data);

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

    console.log("API Response:", response.data);

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

    console.log("API Response:", response.data);

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
