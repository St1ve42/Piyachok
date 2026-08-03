import { Card, Heading} from "@heroui/react";
import Image from "next/image";
import {utilsService} from "@/src/services/utils.service";
import {IPiyachokDetail} from "@/src/interfaces/piyachok/IPiyachokDetail";
import {FC} from "react";
import noImage from "@/src/public/no-image-icon.jpg";
import AvatarCustom from "@/src/components/shared/ui/AvatarCustom";
import UserAvatar from "@/src/public/default_user_avatar.png";
import { Person, Persons } from "@gravity-ui/icons";
import {PiyachokPaymentTypeTranslation} from "@/src/constants/piyachok-payment-type.translation";
import {piyachokService} from "@/src/services/piyachok.service";
import NoResults from "@/src/components/shared/ui/NoResults";
import PiyachokReplyCard from "@/src/components/features/piyachok-reply/PiyachokReplyCard";
import {getOptionalAccessCookie} from "@/src/services/server.service";
import {IUser} from "@/src/interfaces/users/IUser";
import {userService} from "@/src/services/users.service";
import {GlobalUserRoleEnum} from "@/src/enums/user/global.user.role.enum";
import PiyachokManageButtons from "@/src/components/features/piyachok/PiyachokManageButtons";
import PiyachokReplyForm from "@/src/components/features/piyachok-reply/PiyachokReplyForm";
import PaginationWithEclipses from "@/src/components/shared/components/pagination/PaginationWithEclipses";

type PropsType = {
    piyachok: IPiyachokDetail,
    page: number
}

const PiyachokDetailView: FC<PropsType> = async ({piyachok, page}) => {
    const {id, meetDate, meetTime, purpose, foodAndDrink: {name: foodAndDrinkName, mainImage}, creator: {id: creatorId, name: userName, surname, photo}, targetGender, peopleCount, budget, paymentType, createdAt} = piyachok
    const meetDateLocalDateString = utilsService.getLocalDate(meetDate)
    const formattedTime = meetTime.substring(0, meetTime.length - 3)
    const createdAtLocalDateString = utilsService.getLocalDate(createdAt)
    const createdAtLocalTimeString = utilsService.getLocalTime(createdAt)
    const replies = await piyachokService.findReplies(id, {page})
    const accessTokenCookie = await getOptionalAccessCookie()
    let loggedUser: IUser | null = null
    if(accessTokenCookie){
        const userResponse = await userService.me({headers: {'Cookie': accessTokenCookie}})
        if(userResponse.success){
           loggedUser = userResponse.data
        }
    }
    const hasPermissionToManagePiyachok = loggedUser?.id === creatorId || loggedUser?.role === GlobalUserRoleEnum.SUPERADMIN
    return (
        <section className="w-full flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className="flex gap-3">
                    <h1 className="text-2xl font-bold text-neutral-900">Деталі пиячка</h1>
                    {hasPermissionToManagePiyachok && <PiyachokManageButtons piyachok={piyachok}/>}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                <div className="lg:col-span-4 flex flex-col gap-4">
                    <Card className="p-0 overflow-hidden border border-neutral-100 shadow-sm bg-white rounded-2xl relative">
                        <div className="relative w-full h-[300px] bg-neutral-100">
                            <Image
                                src={mainImage ? utilsService.buildStorageURL(mainImage) : noImage}
                                alt={foodAndDrinkName ?? 'Фото закладу'}
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>

                        <div className="p-4 flex items-center justify-between border-t border-neutral-100">
                            <h2 className="font-bold text-sm">
                                Ресторан: <span className="font-semibold">{foodAndDrinkName}</span>
                            </h2>
                        </div>
                    </Card>
                    <Card className="p-4 border border-neutral-100 shadow-sm bg-white rounded-2xl">
                        <h3 className="font-bold text-sm text-neutral-900 mb-3">Творець Зустрічі</h3>
                        <div className="flex items-center gap-3">
                            <AvatarCustom
                                photo={photo}
                                defaultPhoto={UserAvatar?.src}
                                width={40}
                                height={40}
                            />
                            <div className="text-xs">
                                <p className="font-medium text-neutral-900">
                                    Творець: {userName} {surname}
                                </p>
                                <p className="text-[10px] text-neutral-400 mt-0.5">
                                    Створено: {createdAtLocalDateString}, {createdAtLocalTimeString}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-4 max-h-[500px]">


                    <Card className="p-4 border border-neutral-100 shadow-sm bg-white rounded-2xl">
                        <h3 className="font-bold text-sm">Мета</h3>
                        <p className="text-xs leading-relaxed whitespace-pre-line max-h-[70px] overflow-y-auto">
                            {purpose}
                        </p>
                    </Card>
                    <Card className="p-4 border border-neutral-100 shadow-sm bg-white rounded-2xl">
                        <h3 className="font-bold text-sm text-neutral-900">Дата та Час</h3>
                        <div className="space-y-1 text-xs text-neutral-700">
                            <p className="flex items-center gap-1.5">
                                <span>Дата:</span> <span className="font-medium">{meetDateLocalDateString}</span>
                            </p>
                            <p className="flex items-center gap-1.5">
                                <span>Час:</span> <span className="font-medium">{formattedTime}</span>
                            </p>
                        </div>
                    </Card>

                    <Card className="p-4 border border-neutral-100 shadow-sm bg-white rounded-2xl">
                        <h3 className="font-bold text-sm text-neutral-900">Деталі Учасників</h3>
                        <div className="space-y-2 text-xs text-neutral-700">
                            <div className="flex items-center gap-2">
                                <Person className="text-neutral-500 shrink-0" />
                                <span>Цільова Аудиторія: <strong className="font-semibold">{targetGender === 'male' ? 'чоловіча' : 'жіноча'}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Persons className="text-neutral-500 shrink-0" />
                                <span>Кількість Учасників: <strong className="font-semibold">{peopleCount}</strong></span>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4 border border-neutral-100 shadow-sm bg-white rounded-2xl">
                        <h3 className="font-bold text-sm text-neutral-900">Фінанси</h3>
                        <div className="space-y-2 text-xs text-neutral-700">
                            <div className="flex items-start gap-2">
                                <div>
                                    <span className="block">Тип Оплати: <strong className="font-semibold">{PiyachokPaymentTypeTranslation[paymentType]}</strong></span>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div>
                                    <span className="block">Бюджет (на особу): <strong className="font-semibold">{budget} грн</strong></span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="lg:col-span-3 flex flex-col gap-1">
                    <PiyachokReplyForm piyachokId={id} isLogged={!!loggedUser}/>
                    <div>
                        <Heading level={5}>Відповіді</Heading>
                        {replies.success ? (
                            replies.data.data.length > 0 ?
                                <div className="flex flex-col">
                                    <div className="flex flex-col gap-3 overflow-y-auto max-h-[350px] py-1">
                                        {replies.data.data.map(reply => <PiyachokReplyCard key={reply.id} piyachokReply={reply} loggedUser={loggedUser} piyachokId={id}/>)}
                                    </div>
                                    {replies.data.totalPages > 1 && <div><PaginationWithEclipses totalPages={replies.data.totalPages} currentPage={page} isPageInput={false}/></div>}
                                </div>
                                : <NoResults text={'Будьте першим, хто залишить відповідь на цей пиячок!'}/>
                        ) : <div>Сталась помилка: {replies.data.message}</div>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PiyachokDetailView