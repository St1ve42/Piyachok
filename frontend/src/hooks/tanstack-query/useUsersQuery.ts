import {useQuery} from "@tanstack/react-query";
import { superadminUsersService } from "@/src/services/superadmin-users.service";
export function useUsersQuery({searchBy, inputValue, isDropdown}: {searchBy: string, inputValue: string, isDropdown: boolean}){
  return useQuery({
    queryKey: ['users', searchBy, inputValue],
    queryFn: async () => await superadminUsersService.find({[searchBy]: inputValue}),
    enabled: !!inputValue && isDropdown
  })
}