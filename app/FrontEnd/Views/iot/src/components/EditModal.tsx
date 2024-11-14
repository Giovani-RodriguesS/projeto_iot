interface EditModalProps {
    closeModals: () => void;
  }
  
  const EditModal: React.FC<EditModalProps> = ({ closeModals }) => {

    const handleConfirmUpdate = () => {
        closeModals();
        alert("Usuário atualizado com Sucesso!");
      };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
        <div className="bg-white p-6 rounded-lg w-80">
          <h2 className="text-lg font-bold mb-4">Editar Informações</h2>
          <input type="text" placeholder="Nome" className="mb-2 p-2 border w-full rounded" />
          <input type="text" placeholder="Cargo" className="mb-2 p-2 border w-full rounded" />
          <input type="email" placeholder="Email" className="mb-4 p-2 border w-full rounded" />
          <div className="flex justify-end gap-2">
            <button onClick={closeModals} className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-700">
              Cancelar
            </button>
            <button onClick={handleConfirmUpdate} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">
              Salvar
            </button>
          </div>
        </div>
      </div>
      
    );
  };
  
  export default EditModal;
