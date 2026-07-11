import {useQuery} from "@tanstack/react-query";
import {superadminReviewsService} from "@/src/services/superadmin-reviews.service";

export function useReviewQuery({searchBy, inputValue, isDropdown, type}: {searchBy: string, inputValue: string, isDropdown: boolean, type: 'user' | 'superadmin'}){
    return useQuery({
      queryKey: ["reviews", searchBy, inputValue, type],
      queryFn: async () => {
          switch (type) {
            case "superadmin":
                return await superadminReviewsService.find({ [searchBy]: inputValue });
          }
      },
      enabled: !!inputValue && isDropdown,
    });
}