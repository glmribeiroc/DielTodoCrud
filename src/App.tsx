import { TarefasItem } from "./components/TarefasItem";
import { Header } from "./components/Header";
import { TarefaProvider } from "./hooks/useTarefas";
import Modal from "react-modal";
import "./styles/global.scss";
import { useState } from "react";
import { NovaTarefaModal } from "./components/NovaTarefaModal";

Modal.setAppElement("#root");

function App() {
  const [isCriarNovaTarefaOpen, setIsCriarNovaTarefaOpen] = useState(false);

  function handleAbrirCriarNovaTarefaModal() {
    setIsCriarNovaTarefaOpen(true);
  }
  function handleFecharCriarNovaTarefaModal() {
    setIsCriarNovaTarefaOpen(false);
  }

  return (
    <TarefaProvider>
      <Header abrirCriarNovaTarefaModal={handleAbrirCriarNovaTarefaModal} />
      <TarefasItem />
      <NovaTarefaModal
        isOpen={isCriarNovaTarefaOpen}
        fecharModal={handleFecharCriarNovaTarefaModal}
      />
    </TarefaProvider>
  );
}

export default App;
