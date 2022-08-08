import { useTarefas } from "../../hooks/useTarefas";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { RiTodoLine } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";
import { BiTime } from "react-icons/bi";
import styles from "./styles.module.scss";
import { EditarTarefaModal } from "../EditarTarefaModal";
import { useState } from "react";

interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  data: Date;
  duracao: number;
}

export function TarefasItem() {
  const { tarefas, excluirTarefa } = useTarefas();
  const [isEditarTarefaOpen, setIsEditarTarefaOpen] = useState(false);
  const [editarTarefa, setEditarTarefa] = useState<Tarefa>({
    id: "",
    titulo: "",
    descricao: "",
    data: new Date(),
    duracao: 0,
  });

  function handleAbrirEditarNovaTarefaModal(tarefa: Tarefa) {
    setEditarTarefa(tarefa);
    setIsEditarTarefaOpen(true);
  }
  function handleFecharEditarTarefaModal() {
    setIsEditarTarefaOpen(false);
  }

  async function handleExcluirTarefa(id: string) {
    await excluirTarefa(id);
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.tarefasContainer}>
          {tarefas.map((tarefa) => (
            <div key={tarefa.id} className={styles.tarefa}>
              <header>
                <div>
                  <RiTodoLine />
                  <strong>{tarefa.titulo}</strong>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => handleAbrirEditarNovaTarefaModal(tarefa)}
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExcluirTarefa(tarefa.id)}
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </header>

              <div className={styles.descricao}>{tarefa.descricao}</div>

              <div className={styles.info}>
                <div>
                  <FiCalendar />
                  {new Date(tarefa.data).toLocaleDateString("pt-Br", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div>
                  <BiTime />
                  {tarefa.duracao}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <EditarTarefaModal
        isOpen={isEditarTarefaOpen}
        fecharModal={handleFecharEditarTarefaModal}
        tarefa={editarTarefa}
      />
    </>
  );
}
