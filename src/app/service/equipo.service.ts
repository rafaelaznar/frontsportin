import { serverURL } from '../environment/environment';
import { IPageEquipo, IEquipo } from '../model/equipo';

const BASE = serverURL + '/equipo';

function getAuthHeader(): Record<string,string> {
  const h: Record<string,string> = {};
  try {
    const token = localStorage.getItem('token');
    if (token) h['Authorization'] = 'Bearer ' + token;
  } catch (e) { }
  return h;
}

export const EquipoService = {
  async getPage(params: { page?: number; size?: number; sort?: string; description?: string; idCuota?: number; idUsuario?: number; } ) : Promise<IPageEquipo> {
    const query = new URLSearchParams();
    if (params.page != null) query.set('page', String(params.page));
    if (params.size != null) query.set('size', String(params.size));
    if (params.sort) query.set('sort', params.sort);
    if (params.description) query.set('description', params.description);
    if (params.idCuota != null) query.set('idCuota', String(params.idCuota));
    if (params.idUsuario != null) query.set('idUsuario', String(params.idUsuario));

    const url = BASE + '?' + query.toString();
    const headers: any = Object.assign({ 'Content-Type': 'application/json' }, getAuthHeader());
    const res = await fetch(url, { headers });
    if (!res.ok) {
      const text = await res.text();
      throw { status: res.status, message: text };
    }
    return res.json();
  },

  async getOne(id: number): Promise<IEquipo> {
    const res = await fetch(BASE + '/' + id, { headers: Object.assign({ 'Content-Type': 'application/json' }, getAuthHeader()) });
    if (!res.ok) throw { status: res.status, message: await res.text() };
    return res.json();
  },

  async create(payload: Partial<IEquipo>): Promise<IEquipo> {
    const res = await fetch(BASE, { method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json' }, getAuthHeader()), body: JSON.stringify(payload) });
    if (!res.ok) throw { status: res.status, message: await res.text() };
    return res.json();
  },

  async update(payload: Partial<IEquipo>): Promise<IEquipo> {
    const res = await fetch(BASE, { method: 'PUT', headers: Object.assign({ 'Content-Type': 'application/json' }, getAuthHeader()), body: JSON.stringify(payload) });
    if (!res.ok) throw { status: res.status, message: await res.text() };
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(BASE + '/' + id, { method: 'DELETE', headers: getAuthHeader() });
    if (!res.ok) throw { status: res.status, message: await res.text() };
    return;
  }
}
