import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  data: Date;
  duracao: number;
}

type TarefaInput = Omit<Tarefa, "id">;

interface TarefaProviderProps {
  children: ReactNode;
}

interface TarefaContextData {
  tarefas: Tarefa[];
  criarTarefa: (tarefa: TarefaInput) => Promise<void>;
  editarTarefa: (tarefa: Tarefa) => Promise<void>;
  excluirTarefa: (id: string) => Promise<void>;
  buscarTarefas: (tarefa: Tarefa[]) => void;
}

export const TarefaContext = createContext<TarefaContextData>(
  {} as TarefaContextData
);

export function TarefaProvider({ children }: TarefaProviderProps) {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [tarefasInicial, setTarefasInicial] = useState<Tarefa[]>([]);

  useEffect(() => {
    api.get("/").then((response) => {
      setTarefas(response.data.tarefas);
      setTarefasInicial(response.data.tarefas);
    });
  }, []);

  async function criarTarefa({
    titulo,
    descricao,
    data,
    duracao,
  }: TarefaInput) {
    const response = await api.post("/", {
      titulo,
      descricao,
      data,
      duracao,
    });

    const { tarefa } = response.data;

    setTarefas([...tarefas, tarefa]);
  }

  async function editarTarefa({
    id,
    titulo,
    descricao,
    data,
    duracao,
  }: Tarefa) {
    const response = await api.put(`/${id}`, {
      id,
      titulo,
      descricao,
      data,
      duracao,
    });

    const tarefasAtualizada = tarefas;

    const { tarefa } = response.data;

    const tarefaIndex = tarefasAtualizada.findIndex(
      (tarefa) => tarefa.id === id
    );

    const tarefaAtualizada = { ...tarefasAtualizada[tarefaIndex], ...tarefa };

    tarefasAtualizada[tarefaIndex] = tarefaAtualizada;

    setTarefas(tarefasAtualizada);
  }

  async function excluirTarefa(id: string) {
    await api.delete(`/${id}`);

    const tarefasAtualizada = tarefas;

    const tarefaIndex = tarefasAtualizada.findIndex(
      (tarefa) => tarefa.id === id
    );

    tarefasAtualizada.splice(tarefaIndex, 1);

    setTarefas([...tarefasAtualizada]);
  }

  function buscarTarefas(tarefas: Tarefa[]) {
    if (tarefas.length === 0) {
      setTarefas([...tarefasInicial]);
    } else {
      setTarefas(tarefas);
    }
  }

  return (
    <TarefaContext.Provider
      value={{
        tarefas,
        criarTarefa,
        editarTarefa,
        excluirTarefa,
        buscarTarefas,
      }}
    >
      {children}
    </TarefaContext.Provider>
  );
}

export function useTarefas() {
  const context = useContext(TarefaContext);

  return context;
}
