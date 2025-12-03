import React from 'react';
import { useDependencias, TABELAS_ORIGEM } from '../../../hooks/useDependencias';
import './DependenciasPage.scss';

export default function DependenciasPage() {
  const {
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
  } = useDependencias();
  
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
                <th>ID</th>
                <th>Nome</th>
                <th>Nível de Risco</th>
              </tr>
            </thead>
            <tbody>
              {dependencias.map((dep)=>(
                <tr key={dep.id}>
                  <td>{dep.id}</td>
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

      <section className="vinculos-section">
        <div className="section-header">
          <h2 className="mt">Vínculos de Dependências</h2>
          {contextoSelecionado && (
            <button className="btn-secondary btn-sm" onClick={handleLimparContexto}>
              Limpar Contexto
            </button>
          )}
        </div>

        <div className='context-card'>
          <h3 className="card-title">Selecionar Contexto</h3>
          <p className="card-description">
            Selecione a tabela e o ID de origem para gerenciar os vínculos de dependências.
          </p>
          
          <div className='row'>
            <div className="form-field">
              <label htmlFor="tabela-origem">Tabela Origem: <span className="required">*</span></label>
              <select 
                id="tabela-origem"
                value={contextoVinculo.tabela_origem} 
                onChange={e => setContextoVinculo({ ...contextoVinculo, tabela_origem: e.target.value })}
                disabled={loadingVinculos}
              >
                <option value=''>Selecione...</option>
                {TABELAS_ORIGEM.map(tabela => (
                  <option key={tabela.value} value={tabela.value}>
                    {tabela.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="id-origem">ID Origem: <span className="required">*</span></label>
              <input 
                id="id-origem"
                type='number' 
                min="1"
                value={contextoVinculo.id_origem} 
                onChange={e => setContextoVinculo({ ...contextoVinculo, id_origem: e.target.value })}
                disabled={loadingVinculos}
                placeholder="Ex: 123"
              />
            </div>

            <div className="form-actions">
              <button 
                className='btn-primary' 
                onClick={loadVinculos}
                disabled={!contextoCompleto || loadingVinculos}
              >
                {loadingVinculos ? 'Carregando...' : 'Carregar Vínculos'}
              </button>
            </div>
          </div>

          {contextoSelecionado && (
            <div className="context-info">
              <span className="info-badge">
                Contexto: {contextoVinculo.tabela_origem} - ID: {contextoVinculo.id_origem}
              </span>
            </div>
          )}
        </div>

        {contextoSelecionado && (
          <div className='form-card'>
            <h3 className="card-title">Criar Novo Vínculo</h3>
            <p className="card-description">
              Selecione uma dependência para vincular ao contexto atual.
            </p>

            <div className='row'>
              <div className="form-field">
                <label htmlFor="dependencia-vinculo">Dependência: <span className="required">*</span></label>
                <select 
                  id="dependencia-vinculo"
                  value={formVinculo.id_dependencia} 
                  onChange={(e) => setFormVinculo({ ...formVinculo, id_dependencia: e.target.value })}
                  disabled={loadingCriarVinculo || dependencias.length === 0}
                >
                  <option value=''>Selecione uma dependência</option>
                  {dependencias.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.descricao} (Risco: {d.nv_risco})
                    </option>
                  ))}
                </select>
              </div>

              <div className='checkbox-row'>
                <input 
                  type='checkbox' 
                  id="is-principal"
                  checked={formVinculo.is_principal}
                  onChange={e => setFormVinculo({ ...formVinculo, is_principal: e.target.checked })}
                  disabled={loadingCriarVinculo}
                />
                <label htmlFor="is-principal">Marcar como Principal</label>
              </div>

              <div className="form-actions">
                <button 
                  className='btn-primary' 
                  onClick={handleCreateVinculo}
                  disabled={!formVinculo.id_dependencia || loadingCriarVinculo}
                >
                  {loadingCriarVinculo ? 'Criando...' : 'Criar Vínculo'}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {contextoSelecionado && (
          <div className="list-card">
            <div className="list-header">
              <h3>Vínculos Existentes</h3>
              <span className="count-badge">{vinculos.length} vínculo(s)</span>
            </div>
            
            {loadingVinculos ? (
              <div className="loading-state">
                <p>Carregando vínculos...</p>
              </div>
            ) : vinculos.length === 0 ? (
              <div className="empty-state">
                <p>Nenhum vínculo encontrado para este contexto.</p>
                <p className="empty-hint">Crie um novo vínculo usando o formulário acima.</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Dependência</th>
                    <th>Nível de Risco</th>
                    <th>Principal</th>
                  </tr>
                </thead>
                <tbody>
                  {vinculos.map(v => (
                    <tr key={v.id} className={v.is_principal ? 'principal-row' : ''}>
                      <td>{v.id}</td>
                      <td>{v.dependencia?.descricao || 'N/A'}</td>
                      <td>
                        <span className={`risk-badge risk-${v.dependencia?.nv_risco || 0}`}>
                          {v.dependencia?.nv_risco || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span className={`principal-badge ${v.is_principal ? 'is-principal' : ''}`}>
                          {v.is_principal ? 'Sim' : 'Não'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </section>

    </div>
  );
}