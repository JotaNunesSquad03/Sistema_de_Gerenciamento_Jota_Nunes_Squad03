import React, { useState, useMemo,useEffect } from 'react';
import { getDependencias, createDependencia } from '../../../services/dependenciasService';
import './DependenciasPage.scss';
import toast, { Toaster } from 'react-hot-toast';

export default function DependenciasPage() {
  const [dependencias, setDependencias] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    nome: '',
    nivel_risco: '',
  });

  useEffect(()=>{
    loadDependencias();
  },[]);

  const loadDependencias = async () =>{
    try{
      const resp = await getDependencias();
      setDependencias(resp);
    } catch(error){
      console.error("Erro ao carregar dependências:", error);
    }
  }

  const handleCreate = async () =>{
    if(!form.nome.trim()){
      toast.error('Nome é obrigatório!');
      return;
    }

    if(!form.nivel_risco || isNaN(form.nivel_risco)){
      toast.error('Nível de risco inválido!');
      return;
    }

    try{
      await createDependencia({
        descricao: form.nome,
        nv_risco: Number(form.nivel_risco),
      });

      toast.success('Dependência criada com sucesso!');

      setOpenModal(false);
      setForm({ nome: '', nivel_risco: '' });
      loadDependencias();
    }catch(error){
      console.error("Erro ao criar dependência:", error);
    }
  }
  
  return (
    <div className='dependencias-page'>
      <div className='header'>
        <h2 >Dependências</h2>
        <button onClick={()=>setOpenModal(true)} className='btn-primary'>
          Nova Dependência
        </button>
      </div>

      <div className='list-card'>
        {dependencias.length === 0 ? (
          <p>Nenhuma dependência cadastrada.</p>
        ): (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Nível de Risco</th>
              </tr>
            </thead>
            <tbody>
              {dependencias.map((dep)=>(
                <tr key={dep.id}>
                  <td>{dep.descricao}</td>
                  <td>{dep.nv_risco}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {openModal && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h3>Nova Dependência</h3>

            <div className='form-group'>
              <label>Nome:</label>
              <input type='text'
              value={form.nome}
              onChange={(e)=> setForm({...form, nome: e.target.value})}/>
            </div>

            <div className='form-group'>
              <label>Nível de Risco:</label>
              <input type='number'
              value={form.nivel_risco}
              onChange={(e)=> setForm({...form, nivel_risco: e.target.value})}/>
            </div>

            <div className='modal-actions'>
              <button className='btn-secondary' onClick={()=>setOpenModal(false)}>
                Cancelar
              </button>
              
              <button className='btn-primary' onClick={handleCreate}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}