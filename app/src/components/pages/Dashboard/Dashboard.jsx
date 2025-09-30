import "./Dashboard.scss";
import { 
  Search,
  BarChart3,
  Eye,
  User,
  AlertTriangle,
  Users,
  Lock,
  Star,
  Edit,
  Trash2
} from "lucide-react";

export default function Dashboard() {

  return (
    <div className="dashboard-page">
      <div className="overview-section">
        <h2>Visão Geral das Transações</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">
              <BarChart3 />
            </div>
            <div className="metric-content">
              <div className="metric-value">320</div>
              <p>Novos Registros (quantidade ou último registro)</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <Eye />
            </div>
            <div className="metric-content">
              <div className="metric-value">12</div>
              <p>Alterações recentes feitas nos últimos 7 dias</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <AlertTriangle />
            </div>
            <div className="metric-content">
              <div className="metric-value">5</div>
              <p>Alertas pendentes</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <Users />
            </div>
            <div className="metric-content">
              <div className="metric-value">110</div>
              <p>Usuários ativos</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <AlertTriangle />
            </div>
            <div className="metric-content">
              <div className="metric-value">3</div>
              <p>Dependências críticas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="registros-section">
        <div className="table-container">
          <div className="table-header">
            <h2>Visão Geral novos registros criados</h2>
            <div className="search-bar">
              <div className="search-input">
                <Search className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="search-field"
                />
              </div>
            </div>
          </div>
          <table className="registros-table">
            <thead>
              <tr>
                <th>Nome do Registro</th>
                <th>Criado por</th>
                <th>Status</th>
                <th>Data de Criação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Text</td>
                <td>
                  <div className="user-info">
                    <div className="user-avatar sarah-avatar">
                      <User />
                    </div>
                    <span>Sarah Eastern</span>
                  </div>
                </td>
                <td>
                  <span className="status-label">LABEL</span>
                </td>
                <td>2023/09/17</td>
                <td>
                  <div className="action-icons">
                    <Eye className="action-icon" title="Visualizar detalhes" />
                    <Edit className="action-icon" title="Editar registro" />
                    <Trash2 className="action-icon" title="Excluir registro" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Text</td>
                <td>
                  <div className="user-info">
                    <div className="user-avatar sarah-avatar">
                      <User />
                    </div>
                    <span>Sarah Eastern</span>
                  </div>
                </td>
                <td>
                  <span className="status-label">LABEL</span>
                </td>
                <td>2023/09/17</td>
                <td>
                  <div className="action-icons">
                    <Eye className="action-icon" title="Visualizar detalhes" />
                    <Edit className="action-icon" title="Editar registro" />
                    <Trash2 className="action-icon" title="Excluir registro" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Text</td>
                <td>
                  <div className="user-info">
                    <div className="user-avatar sarah-avatar">
                      <User />
                    </div>
                    <span>Sarah Eastern</span>
                  </div>
                </td>
                <td>
                  <span className="status-label">LABEL</span>
                </td>
                <td>2023/09/17</td>
                <td>
                  <div className="action-icons">
                    <Eye className="action-icon" title="Visualizar detalhes" />
                    <Edit className="action-icon" title="Editar registro" />
                    <Trash2 className="action-icon" title="Excluir registro" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Text</td>
                <td>
                  <div className="user-info">
                    <div className="user-avatar sarah-avatar">
                      <User />
                    </div>
                    <span>Sarah Eastern</span>
                  </div>
                </td>
                <td>
                  <span className="status-label">LABEL</span>
                </td>
                <td>2023/09/17</td>
                <td>
                  <div className="action-icons">
                    <Eye className="action-icon" title="Visualizar detalhes" />
                    <Edit className="action-icon" title="Editar registro" />
                    <Trash2 className="action-icon" title="Excluir registro" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Text</td>
                <td>
                  <div className="user-info">
                    <div className="user-avatar sarah-avatar">
                      <User />
                    </div>
                    <span>Sarah Eastern</span>
                  </div>
                </td>
                <td>
                  <span className="status-label">LABEL</span>
                </td>
                <td>2023/09/17</td>
                <td>
                  <div className="action-icons">
                    <Eye className="action-icon" title="Visualizar detalhes" />
                    <Edit className="action-icon" title="Editar registro" />
                    <Trash2 className="action-icon" title="Excluir registro" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Text</td>
                <td>
                  <div className="user-info">
                    <div className="user-avatar sarah-avatar">
                      <User />
                    </div>
                    <span>Sarah Eastern</span>
                  </div>
                </td>
                <td>
                  <span className="status-label">LABEL</span>
                </td>
                <td>2023/09/17</td>
                <td>
                  <div className="action-icons">
                    <Eye className="action-icon" title="Visualizar detalhes" />
                    <Edit className="action-icon" title="Editar registro" />
                    <Trash2 className="action-icon" title="Excluir registro" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
