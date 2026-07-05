import {useQuery} from "@tanstack/react-query";
import {userService} from "@/src/services/users.service";
import {superadminReviewsService} from "@/src/services/superadmin-reviews.service";

export function useReviewQuery({searchBy, inputValue, isDropdown, type}: {searchBy: string, inputValue: string, isDropdown: boolean, type: 'user' | 'superadmin'}){
    return useQuery({
      queryKey: ["reviews", searchBy, inputValue, type],
      queryFn: async () => {
          switch (type) {
            case "user":
                return await userService.findMyReviews({ [searchBy]: inputValue });
            case "superadmin":
                return await superadminReviewsService.find({ [searchBy]: inputValue });
          }
      },
      enabled: !!inputValue && isDropdown,
    });
}