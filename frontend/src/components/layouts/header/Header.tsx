'use client'
import Image from "next/image";
import Logo from "@/src/public/logo.png"
import Menu from "@/src/components/ui/menu/Menu";
import Link from "next/link";
import { ReactNode } from "react";
import { Button, Modal } from "@heroui/react";

interface HeaderProps {
    profileSlot: ReactNode;
}

const Header = ({profileSlot}: HeaderProps) => {
    return (
        <header className="flex justify-between h-[14.5vh] items-center px-6 pb-2 border-b-1 fixed z-10 w-[80%] bg-white">
            <div className="flex gap-10 items-center">
                <Link href={'/'}>
                    <Image src={Logo} alt="Logo" width={150} height={150} priority={true} className="w-[150px] h-auto"/>
                </Link>
                <Menu/>
                <Modal>
                  <Button className={'hidden'}/>
                  <Modal.Backdrop>
                    <Modal.Container>
                      <Modal.Dialog className="sm:max-w-[450px]">
                        <Modal.Header>
                          <Modal.Heading className="font-bold">Підтвердження</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                          <div>Запускаючи цей додаток, Ви погоджуєтесь, що Вам є 18 років. Адміністрація застерігає вас бути обережними і не зустрічатися з незнайомими людьми в небезпечних чи невідомих вам місцях.</div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button className="w-full bg-green-400" slot="close">
                            Так
                          </Button>
                          <Button variant="danger" className="w-full" slot="close">
                            Ні
                          </Button>
                        </Modal.Footer>
                      </Modal.Dialog>
                    </Modal.Container>
                  </Modal.Backdrop>
                </Modal>
            </div>
            <div className="flex justify-end items-center h-[10%]">
                {profileSlot}
            </div>
        </header>
    )
}

export default Header