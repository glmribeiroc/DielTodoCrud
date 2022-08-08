import styles from "./styles.module.scss";
import { FiSearch } from "react-icons/fi";
import { ChangeEvent } from "react";
import { useTarefas } from "../../hooks/useTarefas";

interface HeaderProps {
  abrirCriarNovaTarefaModal: () => void;
}

export function Header({ abrirCriarNovaTarefaModal }: HeaderProps) {
  const { buscarTarefas, tarefas } = useTarefas();

  function handleBuscar(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.value) {
      buscarTarefas([]);
      return;
    }

    const filtrarTarefas = tarefas.filter((tarefa) =>
      tarefa.titulo.includes(event.target.value)
    );
    buscarTarefas(filtrarTarefas);

    console.log(tarefas);
  }

  function handleOrdenarDia() {
    const sortPorData = (a: any, b: any) => {
      return a.data.localeCompare(b.data);
    };

    const sorted = tarefas.sort(sortPorData);

    buscarTarefas([...sorted]);
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerTitle}>
          <h1>Teste Diel</h1>
          <p>Guilherme Ribeiro Costa</p>
        </div>
        <div className={styles.searchHeader}>
          <form id="searchForm" name="search">
            <button form="searchForm">
              <FiSearch color="white" />
            </button>
            <input
              type="search"
              onChange={handleBuscar}
              placeholder="Pesquisar tarefa"
            />
          </form>
          <button type="button" onClick={abrirCriarNovaTarefaModal}>
            Criar nova tarefa
          </button>
        </div>
        <span>
          <button type="button" onClick={handleOrdenarDia}>
            Ordernar por dia
          </button>
        </span>
      </div>
    </header>
  );
}
