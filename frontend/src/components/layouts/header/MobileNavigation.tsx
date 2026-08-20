'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Dropdown, Button, Header, Avatar } from "@heroui/react";
import { IUser } from '@/src/interfaces/users/IUser'
import { GlobalUserRoleEnum } from '@/src/enums/user/global.user.role.enum'
import { authService } from "@/src/services/auth.service";
import {
  Gear,
  Comment,
  Comments,
  Star,
  Person,
  Persons,
  ChartColumn,
  ArrowRightFromSquare,
  House,
  ListUl,
  Heart,
  Plus,
  Shield,
  Bars,
  CircleNumber1,
} from "@gravity-ui/icons";
import {utilsService} from "@/src/services/utils.service";
import UserAvatar from "@/src/public/default_user_avatar.png";
import React from "react";

interface MobileNavigationProps {
  user: IUser
}

const MobileNavigation = ({ user }: MobileNavigationProps) => {
  const { role, ownerOf } = user
  const router = useRouter()

  const handleExit = async () => {
    const response = await authService.logOut()
    if (response.success) {
      router.refresh()
    }
  }
  const {name, surname, photo} = user
  return (
    <Dropdown className="max-lg:flex lg:hidden">
      <Button
        isIconOnly
        aria-label="Toggle navigation menu"
        className="max-lg:flex lg:hidden"
      >
        <Gear/>
      </Button>
      <Dropdown.Popover className="max-w-[40vw]">
        <div className="pl-[13px] flex flex-col gap-2 mt-2 sm:hidden">
          <Avatar className={'size-14'}>
            <Avatar.Image alt="фото" src={photo ? utilsService.buildStorageURL(photo) : UserAvatar.src} width={100} height={100}/>
          </Avatar>
          <p className="">{name} {surname}</p>
        </div>
        <Dropdown.Menu className="w-screen lg:hidden max-lg:gap-0" aria-label="Navigation menu">
          <Dropdown.Section className="max-lg:pb-2">
            <Header>Мій простір</Header>
            <Dropdown.Item key="profile" className="text-sm">
              <Link href="/account" className="flex w-full items-center gap-3">
                <Person/> Профіль
              </Link>
            </Dropdown.Item>
            <Dropdown.Item key="favourites" className="text-sm">
              <Link href="/account/favourites" className="flex w-full items-center gap-3">
                <Heart/> Улюблені
              </Link>
            </Dropdown.Item>
            <Dropdown.Item key="reviews" className="text-sm">
              <Link href="/account/reviews" className="flex w-full items-center gap-3">
                <Star/> Відгуки
              </Link>
            </Dropdown.Item>
            <Dropdown.Item key="comments" className="text-sm">
              <Link href="/account/comments" className="flex w-full items-center gap-3">
                <Comment/> Коментарі
              </Link>
            </Dropdown.Item>
          </Dropdown.Section>

          <Dropdown.Section className="max-lg:py-2">
            <Header>Мій заклад</Header>
            {ownerOf && (
              <Dropdown.Item
                key="establishment"
                className="text-sm"
              >
                <Link href="/account/food-and-drink" className="flex w-full items-center gap-3">
                  <House/> Заклад
                </Link>
              </Dropdown.Item>
            )}
            {ownerOf && (
              <Dropdown.Item
                key="statistics"
                className="text-sm"
              >
                <Link href="/account/statistics" className="flex w-full items-center gap-3">
                  <ChartColumn/> Статистика
                </Link>
              </Dropdown.Item>
            )}
            {!ownerOf && (
              <Dropdown.Item
                key="create-establishment"
                className="text-sm"
              >
                <Link href="/account/food-and-drink/create" className="flex w-full items-center gap-3">
                  <Plus/> Створити заклад
                </Link>
              </Dropdown.Item>
            )}
            {ownerOf && (
              <Dropdown.Item
                key="create-news"
                className="text-sm"
              >
                <Link href="/account/news/create" className="flex w-full items-center gap-3">
                  <Plus/> Створити новину
                </Link>
              </Dropdown.Item>
            )}
            {ownerOf && (
              <Dropdown.Item
                key="news"
                className="text-sm"
              >
                <Link href="/account/news" className="flex w-full items-center gap-3">
                  <Bars/> Новини
                </Link>
              </Dropdown.Item>
            )}
          </Dropdown.Section>

          {role === GlobalUserRoleEnum.SUPERADMIN && (
            <Dropdown.Section className="max-lg:py-2">
              <Header>Модерація</Header>
              <Dropdown.Item
                key="moderate-establishments"
                className="text-sm"
              >
                <Link href="/account/superadmin/food-and-drinks/moderate" className="flex w-full items-center gap-3">
                  <Shield/> Модерація закладів
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                key="all-establishments"
                className="text-sm"
              >
                <Link href="/account/superadmin/food-and-drinks" className="flex w-full items-center gap-3">
                  <ListUl/> Усі заклади
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                key="all-users"
                className="text-sm"
              >
                <Link href="/account/superadmin/users" className="flex w-full items-center gap-3">
                  <Persons/> Усі користувачі
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                key="all-comments"
                className="text-sm"
              >
                <Link href="/account/superadmin/comments" className="flex w-full items-center gap-3">
                  <Comments/> Усі коментарі
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                key="all-news"
                className="text-sm"
              >
                <Link href="/account/superadmin/news" className="flex w-full items-center gap-3">
                  <Persons/> Усі новини
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                key="all-reviews"
                className="text-sm"
              >
                <Link href="/account/superadmin/reviews" className="flex w-full items-center gap-3">
                  <Star/> Усі відгуки
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                key="all-top-categories"
                className="text-sm"
              >
                <Link href="/account/superadmin/top-categories" className="flex w-full items-center gap-3">
                  <CircleNumber1/> Усі топ категорії
                </Link>
              </Dropdown.Item>
            </Dropdown.Section>
          )}

          <Dropdown.Section className="max-lg:pt-2">
            <Dropdown.Item
              key="exit"
              onClick={handleExit}
              className="text-sm text-red-600"
            >
              <div className="flex w-full items-center gap-3">
                <ArrowRightFromSquare/> Вийти
              </div>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}

export default MobileNavigation
