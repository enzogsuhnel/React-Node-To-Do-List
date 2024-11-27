import lines from '../../assets/img/lines.png'
import lines2 from '../../assets/img/lines-2.png'
import { ReactNode } from 'react';

interface HeroProps {
  children: ReactNode
}

export default function Hero({ children }: HeroProps) {
  return (
    <div className="flex flex-col lg:flex-row w-full justify-between items-center gap-16 mt-10">
      <div className="w-full lg:w-1/2 flex flex-col gap-8 mx-8">
        <p className="text-3xl md:text-4xl text-white font-semibold leading-10">
          Organize suas tarefas e <br />
          <span className="relative m-2">compartilhe
            <img src={lines} className="absolute right-0" />
          </span>
          com quem <span className="relative m-2">importa!
            <img src={lines2} className="absolute -right-8 -top-4 w-8" />
          </span>
        </p>
        <p className="text-white font-light">
          Gerencie suas listas, colabore com amigos e mantenha tudo em dia com facilidade.
        </p>
      </div>
      {children}
    </div >
  );
}
