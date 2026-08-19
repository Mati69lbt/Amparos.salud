import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { LogOut, Moon, Plus, Search, ShieldPlus, Sun, Trash2 } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useCrmAuth } from "../hooks/useCrmAuth";
import { subscribeToLeads, addLead, updateLead, deleteLead } from "../firebase/leadsService";
import LeadModal from "../components/crm/LeadModal";
import { STATUS_OPTIONS } from "../components/crm/crmConstants";

const STATUS_BADGE = {
  Nuevo: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "En Proceso": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Contactado: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  Cerrado: "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

const formatDate = (timestamp) => {
  if (!timestamp?.toDate) return "-";
  return timestamp.toDate().toLocaleDateString("es-AR");
};

const formatTime = (timestamp) => {
  if (!timestamp?.toDate) return "-";
  return timestamp.toDate().toLocaleTimeString("es-AR");
};

const LoginGate = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onLogin(password)) {
      toast.error("Contraseña incorrecta.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <button
        type="button"
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Cambiar tema"
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-4"
      >
        <div className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
          <ShieldPlus className="text-blue-600 dark:text-blue-400" size={24} />
          Panel CRM
        </div>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

const ClientesPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, login, logout } = useCrmAuth();
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [editingLead, setEditingLead] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    document.title = "Panel CRM | Amparo Salud";
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "robots";
      document.head.appendChild(meta);
    }
    meta.content = "noindex, nofollow";
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return undefined;

    const unsubscribe = subscribeToLeads(
      (data) => {
        setLeads(data);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error al leer los leads:", error);
        toast.error("No se pudieron cargar los clientes.");
        setIsLoading(false);
      },
    );

    return unsubscribe;
  }, [isAuthenticated]);

  const filteredLeads = useMemo(() => {
    const term = search.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesStatus = statusFilter === "Todos" || lead.status === statusFilter;
      const matchesTerm =
        !term ||
        lead.name?.toLowerCase().includes(term) ||
        lead.email?.toLowerCase().includes(term) ||
        lead.status?.toLowerCase().includes(term);
      return matchesStatus && matchesTerm;
    });
  }, [leads, search, statusFilter]);

  if (!isAuthenticated) {
    return <LoginGate onLogin={login} />;
  }

  const handleSave = async (form) => {
    try {
      if (editingLead?.id) {
        await updateLead(editingLead.id, form);
        toast.success("Cliente actualizado.");
      } else {
        await addLead(form);
        toast.success("Cliente creado.");
      }
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
      toast.error("Ocurrió un error al guardar el cliente.");
      throw error;
    }
  };

  const handleStatusChange = async (lead, status) => {
    try {
      await updateLead(lead.id, { status });
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      toast.error("No se pudo actualizar el estado.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLead(id);
      toast.success("Cliente eliminado.");
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
      toast.error("No se pudo eliminar el cliente.");
    } finally {
      setPendingDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <span className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
          <ShieldPlus className="text-blue-600 dark:text-blue-400" size={24} />
          Panel CRM
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1.5 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <LogOut size={18} />
            Salir
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, email o estado..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todos">Todos los estados</option>
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            <Plus size={18} />
            Nuevo cliente
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Contacto</th>
                <th className="px-4 py-3">Consulta</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Hora</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-950">
              {isLoading && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    Cargando clientes...
                  </td>
                </tr>
              )}

              {!isLoading && filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No se encontraron clientes.
                  </td>
                </tr>
              )}

              {!isLoading &&
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900"
                    onClick={() => setEditingLead(lead)}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{lead.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {lead.phone}
                      {lead.email && <div>{lead.email}</div>}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 max-w-xs truncate">
                      {lead.message}
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead, e.target.value)}
                        className={`text-xs font-semibold px-2 py-1 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 ${STATUS_BADGE[lead.status] ?? ""}`}
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-500 whitespace-nowrap">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-500 whitespace-nowrap">
                      {formatTime(lead.createdAt)}
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => setPendingDeleteId(lead.id)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                        aria-label="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>

      {(isCreating || editingLead) && (
        <LeadModal
          lead={editingLead}
          onSave={handleSave}
          onClose={() => {
            setIsCreating(false);
            setEditingLead(null);
          }}
        />
      )}

      {pendingDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <p className="text-gray-900 dark:text-white font-medium">
              ¿Eliminar este cliente? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPendingDeleteId(null)}
                className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleDelete(pendingDeleteId)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientesPage;
