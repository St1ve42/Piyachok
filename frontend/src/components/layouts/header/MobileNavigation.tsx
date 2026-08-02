'use client'

import { useRouter } from 'next/navigation'
import { Dropdown, Button, Header } from "@heroui/react";
import Link from 'next/link'
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

  return (
    <Dropdown className="max-lg:flex lg:hidden">
      <Button
        isIconOnly
        variant="light"
        aria-label="Toggle navigation menu"
        className="max-lg:flex lg:hidden"
      >
        <Gear/>
      </Button>
      <Dropdown.Popover className="max-w-[40vw]">
        <Dropdown.Menu className="w-screen lg:hidden max-lg:gap-0" aria-label="Navigation menu">
          {/* My Space Section */}
          <Dropdown.Section title="Мій простір" className="max-lg:pb-2">
            <Header>Мій простір</Header>
            <Dropdown.Item key="profile" as={Link} href="/account" className="text-sm">
              <div className="flex w-full items-center gap-3">
                <Person/> Профіль
              </div>
            </Dropdown.Item>
            <Dropdown.Item key="favourites" as={Link} href="/account/favourites" className="text-sm">
              <div className="flex w-full items-center gap-3">
                <Heart/> Улюблені
              </div>
            </Dropdown.Item>
            <Dropdown.Item key="reviews" as={Link} href="/account/reviews" className="text-sm">
              <div className="flex w-full items-center gap-3">
                <Star/> Відгуки
              </div>
            </Dropdown.Item>
            <Dropdown.Item key="comments" as={Link} href="/account/comments" className="text-sm">
              <div className="flex w-full items-center gap-3">
                <Comment/> Коментарі
              </div>
            </Dropdown.Item>
          </Dropdown.Section>

          {/* My Establishment Section */}
          <Dropdown.Section title="Мій заклад" className="max-lg:py-2">
            <Header>Мій заклад</Header>
            {ownerOf && (
              <Dropdown.Item
                key="establishment"
                as={Link}
                href="/account/food-and-drink"
                className="text-sm"
              >
                <div className="flex w-full items-center gap-3">
                  <House/> Заклад
                </div>
              </Dropdown.Item>
            )}
            {ownerOf && (
              <Dropdown.Item
                key="statistics"
                as={Link}
                href="/account/statistics"
                className="text-sm"
              >
                <div className="flex w-full items-center gap-3">
                  <ChartColumn/> Статистика
                </div>
              </Dropdown.Item>
            )}
            {!ownerOf && (
              <Dropdown.Item
                key="create-establishment"
                as={Link}
                href="/account/food-and-drink/create"
                className="text-sm"
              >
                <div className="flex w-full items-center gap-3">
                  <Plus/> Створити заклад
                </div>
              </Dropdown.Item>
            )}
            {ownerOf && (
              <Dropdown.Item
                key="create-news"
                as={Link}
                href="/account/news/create"
                className="text-sm"
              >
                <div className="flex w-full items-center gap-3">
                  <Plus/> Створити новину
                </div>
              </Dropdown.Item>
            )}
            {ownerOf && (
              <Dropdown.Item
                key="news"
                as={Link}
                href="/account/news"
                className="text-sm"
              >
                <div className="flex w-full items-center gap-3">
                  <Bars/> Новини
                </div>
              </Dropdown.Item>
            )}
          </Dropdown.Section>

          {/* Moderation Section (Superadmin Only) */}
          {role === GlobalUserRoleEnum.SUPERADMIN && (
            <Dropdown.Section title="Модерація" className="max-lg:py-2">
              <Header>Модерація</Header>
              <Dropdown.Item
                key="moderate-establishments"
                as={Link}
                href="/account/superadmin/food-and-drinks/moderate"
                className="text-sm"
              >
                <div className="flex w-full items-center gap-3">
                  <Shield/> Модерація закладів
                </div>
              </Dropdown.Item>
              <Dropdown.Item
                key="all-establishments"
                as={Link}
                href="/account/superadmin/food-and-drinks"
                className="text-sm"
              >
                <div className="flex w-full items-center gap-3">
                  <ListUl/> Усі заклади
                </div>
              </Dropdown.Item>
              <Dropdown.Item
                key="all-users"
                as={Link}
                href="/account/superadmin/users"
                className="text-sm"
              >
                <div className="flex w-full items-center gap-3">
                  <Persons/> Усі користувачі
                </div>
              </Dropdown.Item>
              <Dropdown.Item
                key="all-comments"
                as={Link}
                href="/account/superadmin/comments"
                className="text-sm"
              >
                <div className="flex w-full items-center gap-3">
                  <Comments/> Усі коментарі
                </div>
              </Dropdown.Item>
              <Dropdown.Item
                key="all-news"
                as={Link}
                href="/account/superadmin/news"
                className="text-sm"
              >
                <div className="flex w-full items-center gap-3">
                  <Persons/> Усі новини
                </div>
              </Dropdown.Item>
              <Dropdown.Item
                key="all-reviews"
                as={Link}
                href="/account/superadmin/reviews"
                className="text-sm"
              >
                <div className="flex w-full items-center gap-3">
                  <Star/> Усі відгуки
                </div>
              </Dropdown.Item>
              <Dropdown.Item
                key="all-top-categories"
                as={Link}
                href="/account/superadmin/top-categories"
                className="text-sm"
              >
                <div className="flex w-full items-center gap-3">
                  <CircleNumber1/> Усі топ категорії
                </div>
              </Dropdown.Item>
            </Dropdown.Section>
          )}

          {/* Exit Section */}
          <Dropdown.Section className="max-lg:pt-2">
            <Dropdown.Item
              key="exit"
              onClick={handleExit}
              className="text-sm text-red-600"
              color="danger"
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
