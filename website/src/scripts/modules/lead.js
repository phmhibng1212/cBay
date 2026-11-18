/**
 * Gửi thông tin khách hàng (form dùng thử / liên hệ).
 *
 * TODO(dev): hiện CHƯA gửi dữ liệu đi đâu (giống bản landing cũ và code thiết kế).
 * Khi có API/CRM/Google Sheet, điền URL vào LEAD_ENDPOINT — payload là JSON:
 *   { form: 'trial' | 'contact', page, product?, need?, name, phone, area, job?, at }
 */
export const LEAD_ENDPOINT = null;

export async function submitLead(payload) {
  const body = { ...payload, page: document.body.dataset.page || '', at: new Date().toISOString() };
  if (!LEAD_ENDPOINT) {
    await new Promise((r) => setTimeout(r, 700)); // giả lập thời gian gửi
    console.info('[cBay] Lead (chưa gửi đi đâu – xem src/scripts/modules/lead.js):', body);
    return { ok: true };
  }
  const res = await fetch(LEAD_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Gửi thất bại (${res.status})`);
  return { ok: true };
}
