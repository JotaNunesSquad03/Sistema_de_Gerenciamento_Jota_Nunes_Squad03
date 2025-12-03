import { useState, useEffect } from 'react';
import { getDependencias, createDependencia, getDependenciasRegistro, createDependenciaRegistro } from '../services/dependenciasService';
import toast from 'react-hot-toast';

export const TABELAS_ORIGEM = [
  { value: 'AUD_FV', label: 'AUD_FV' },
  { value: 'AUD_SQL', label: 'AUD_SQL' },
  { value: 'AUD_REPORT', label: 'AUD_REPORT' },
  { value: 'OUTRA_TABELA', label: 'OUTRA_TABELA' },
];

export const useDependencias = () => {
  const [dependencias, setDependencias] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    nome: '',
    nivel_risco: '',
  });

  const [contextoVinculo, setContextoVinculo] = useState({
    tabela_origem: '',
    id_origem: '',
  });
  const [formVinculo, setFormVinculo] = useState({
    id_dependencia: '',
    is_principal: false,
  });
  const [vinculos, setVinculos] = useState([]);
  const [loadingVinculos, setLoadingVinculos] = useState(false);
  const [loadingCriarVinculo, setLoadingCriarVinculo] = useState(false);
  const [contextoSelecionado, setContextoSelecionado] = useState(false);

  useEffect(() => {
    loadDependencias();
  }, []);

  const loadDependencias = async () => {
    try {
      const resp = await getDependencias();
      setDependencias(resp);
    } catch (error) {
      console.error("Erro ao carregar dependências:", error);
      toast.error('Erro ao carregar dependências.');
    }
  };

  const handleCreate = async () => {
    if (!form.nome.trim()) {
      toast.error('Nome é obrigatório!');
      return;
    }

    if (!form.nivel_risco || isNaN(form.nivel_risco)) {
      toast.error('Nível de risco inválido!');
      return;
    }

    try {
      await createDependencia({
        descricao: form.nome,
        nv_risco: Number(form.nivel_risco),
      });

      toast.success('Dependência criada com sucesso!');
      setOpenModal(false);
      setForm({ nome: '', nivel_risco: '' });
      loadDependencias();
    } catch (error) {
      console.error("Erro ao criar dependência:", error);
      toast.error('Erro ao criar dependência.');
    }
  };

  const validarContexto = () => {
    if (!contextoVinculo.tabela_origem || !contextoVinculo.tabela_origem.trim()) {
      toast.error('Selecione uma tabela de origem.');
      return false;
    }
    if (!contextoVinculo.id_origem || !contextoVinculo.id_origem.trim()) {
      toast.error('Informe o ID de origem.');
      return false;
    }
    if (isNaN(contextoVinculo.id_origem) || Number(contextoVinculo.id_origem) <= 0) {
      toast.error('ID de origem deve ser um número válido maior que zero.');
      return false;
    }
    return true;
  };

  const loadVinculos = async () => {
    if (!validarContexto()) {
      return;
    }

    setLoadingVinculos(true);
    try {
      const resp = await getDependenciasRegistro(
        contextoVinculo.tabela_origem,
        contextoVinculo.id_origem
      );
      const normalizado = resp.map(v => {
        const dep = dependencias.find(d => d.id === v.id_dependencia);

        return {
          ...v,
          dependencia: dep ? {
            id: dep.id,
            descricao: dep.descricao,
            nv_risco: dep.nv_risco,
          } : null
        };
      });

      console.log("👉 Vínculos normalizados:", normalizado);

      setVinculos(normalizado);
      setContextoSelecionado(true);
      toast.success('Vínculos carregados com sucesso!');
    } catch (error) {
      console.error("Erro ao carregar vínculos:", error);
      toast.error("Erro ao carregar vínculos.");
      setVinculos([]);
      setContextoSelecionado(false);
    } finally {
      setLoadingVinculos(false);
    }
  };

  const validarFormVinculo = () => {
    if (!contextoSelecionado) {
      toast.error('Selecione um contexto primeiro e carregue os vínculos.');
      return false;
    }
    if (!formVinculo.id_dependencia || !formVinculo.id_dependencia.trim()) {
      toast.error('Selecione uma dependência para vincular.');
      return false;
    }
    return true;
  };

  const handleCreateVinculo = async () => {
    if (!validarFormVinculo()) {
      return;
    }

    setLoadingCriarVinculo(true);
    try {
      await createDependenciaRegistro({
        tabela_origem: contextoVinculo.tabela_origem,
        id_origem: Number(contextoVinculo.id_origem),
        id_dependencia: Number(formVinculo.id_dependencia),
        is_principal: formVinculo.is_principal
      });

      toast.success("Vínculo criado com sucesso!");
      setFormVinculo({ id_dependencia: '', is_principal: false });
      loadVinculos();
    } catch (error) {
      console.error("Erro ao criar vínculo:", error);
      toast.error("Erro ao criar vínculo.");
    } finally {
      setLoadingCriarVinculo(false);
    }
  };

  const handleLimparContexto = () => {
    setContextoVinculo({ tabela_origem: '', id_origem: '' });
    setFormVinculo({ id_dependencia: '', is_principal: false });
    setVinculos([]);
    setContextoSelecionado(false);
  };

  const contextoCompleto = contextoVinculo.tabela_origem && contextoVinculo.id_origem;

  return {
    dependencias,
    openModal,
    setOpenModal,
    form,
    setForm,
    handleCreate,
    contextoVinculo,
    setContextoVinculo,
    formVinculo,
    setFormVinculo,
    vinculos,
    loadingVinculos,
    loadingCriarVinculo,
    contextoSelecionado,
    loadVinculos,
    handleCreateVinculo,
    handleLimparContexto,
    contextoCompleto,
  };
};

