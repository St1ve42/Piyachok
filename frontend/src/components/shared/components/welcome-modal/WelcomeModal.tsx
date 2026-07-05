import { Button, Modal } from "@heroui/react";
import {useConfirmAgeStore} from "@/src/hooks/shared/useSharedStore";
import {redirect} from "next/navigation";

const WelcomeModal = () => {
    const {isConfirmed, setIsConfirmedAge} = useConfirmAgeStore()
    if(isConfirmed === null){
        return <Modal defaultOpen={true}>
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
                          <Button className="w-full bg-green-400" slot="close" onClick={() => setIsConfirmedAge(true)}>
                              Так
                          </Button>
                          <Button variant="danger" className="w-full" slot="close" onClick={() => redirect('https://google.com')}>
                              Ні
                          </Button>
                      </Modal.Footer>
                  </Modal.Dialog>
              </Modal.Container>
          </Modal.Backdrop>
     </Modal>;
    }
};

export default WelcomeModal;
