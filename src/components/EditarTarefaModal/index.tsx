import { FormEvent, useState } from "react";
import Modal from "react-modal";
import styles from "./styles.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useTarefas } from "../../hooks/useTarefas";

interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  data: Date;
  duracao: number;
}

interface EditarTarefaModalProps {
  isOpen: boolean;
  tarefa: Tarefa;
  fecharModal: () => void;
}

export function EditarTarefaModal({
  isOpen,
  fecharModal,
  tarefa,
}: EditarTarefaModalProps) {
  const { editarTarefa } = useTarefas();
  const [titulo, setTitulo] = useState(tarefa.titulo);
  const [descricao, setDescricao] = useState(tarefa.descricao);
  const [data, setData] = useState(new Date());
  const [duracao, setDuracao] = useState(tarefa.duracao);

  async function handleEditarTarefa(event: FormEvent) {
    event.preventDefault();

    await editarTarefa({ id: tarefa.id, titulo, descricao, data, duracao });

    setTitulo("");
    setDescricao("");
    setData(new Date());
    setDuracao(0);

    fecharModal();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={fecharModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <div>
        <button
          type="button"
          onClick={fecharModal}
          className="react-modal-close"
        >
          <AiOutlineClose />
        </button>
      </div>
      <form className={styles.modalForm} onSubmit={handleEditarTarefa}>
        <h2>Editar tarefa</h2>
        <input
          placeholder={tarefa.titulo}
          defaultValue="Teste"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          placeholder={tarefa.descricao}
          defaultValue="Teste"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="date"
          onChange={(e) => setData(new Date(e.target.value))}
        />
        <input
          value={duracao}
          defaultValue="Teste"
          onChange={(e) => setDuracao(Number(e.target.value))}
        />

        <button type="submit">Editar</button>
      </form>
    </Modal>
  );
}
