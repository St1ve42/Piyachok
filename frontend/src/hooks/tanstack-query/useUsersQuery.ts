import {useQuery} from "@tanstack/react-query";
import { superadminUsersService } from "@/src/services/superadmin-users.service";
export function useUsersQuery({name, surname}: {name: string, surname: string}){
  return useQuery({
    queryKey: ['users', name, surname],
    queryFn: async () => await superadminUsersService.find({limit: 20, name}),
    enabled: !!name
  })
}