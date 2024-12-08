import axios from "axios";
import { serverApi } from "../../lib/config";

export const getAllPlanLists = async (page_cnt, list_cnt) => {
    try {
      const response = await axios.post(
        `${serverApi}/api/getAllPlanLists/`,
        {
            page_cnt: page_cnt,
            list_cnt:list_cnt,
        },
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