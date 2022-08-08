import { FormEvent, useState } from "react";
import Modal from "react-modal";
import styles from "./styles.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useTarefas } from "../../hooks/useTarefas";

interface NovaTarefaModalProps {
  isOpen: boolean;
  fecharModal: () => void;
}

export function NovaTarefaModal({ isOpen, fecharModal }: NovaTarefaModalProps) {
  const { criarTarefa } = useTarefas();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(new Date());
  const [duracao, setDuracao] = useState(0);

  async function handleCriarNovaTarefa(event: FormEvent) {
    event.preventDefault();

    await criarTarefa({ titulo, descricao, data, duracao });

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
      <form className={styles.modalForm} onSubmit={handleCriarNovaTarefa}>
        <h2>Cadastrar nova tarefa</h2>
        <input
          placeholder="Titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="date"
          onChange={(e) => setData(new Date(e.target.value))}
        />
        <input
          placeholder="Duração em minutos"
          value={duracao}
          onChange={(e) => setDuracao(Number(e.target.value))}
        />

        <button type="submit">Criar</button>
      </form>
    </Modal>
  );
}
