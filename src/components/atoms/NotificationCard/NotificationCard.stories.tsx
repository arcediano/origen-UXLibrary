import type { Meta, StoryObj } from "@storybook/react";
import { NotificationCard } from "./NotificationCard";
import { NotificationCardSkeleton } from "./NotificationCardSkeleton";

const meta: Meta<typeof NotificationCard> = {
  title: "Atoms/NotificationCard",
  component: NotificationCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Tarjeta de notificación individual con iconografía por tipo de evento, badge de prioridad, badge de categoría e indicador de estado no leído. Acepta la prop `compact` para el dropdown de la campana.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationCard>;

// ─── Historia A: No leída, prioridad URGENT, categoría ORDER ─────────────────

export const NoLeidaUrgente: Story = {
  name: "A — No leída, URGENTE, ORDER",
  render: () => (
    <div className="max-w-md border border-border-subtle rounded-2xl overflow-hidden bg-white">
      <NotificationCard
        notification={{
          id: "notif-001",
          title: "Pedido cancelado por el comprador",
          description:
            "El pedido #4892 ha sido cancelado. Revisa el motivo y contacta al equipo si necesitas asistencia.",
          timestamp: new Date(Date.now() - 1000 * 60 * 8),
          read: false,
          category: "ORDER",
          eventType: "ORDER_CANCELLED",
          priority: "URGENT",
          action: { url: "/dashboard/orders/4892" },
        }}
        onMarkAsRead={(id) => console.log("Marcar como leída:", id)}
      />
    </div>
  ),
};

// ─── Historia B: Leída, prioridad LOW, categoría REVIEW ──────────────────────

export const LeidaBajaPrioridad: Story = {
  name: "B — Leída, LOW, REVIEW",
  render: () => (
    <div className="max-w-md border border-border-subtle rounded-2xl overflow-hidden bg-white">
      <NotificationCard
        notification={{
          id: "notif-002",
          title: "Nueva reseña de 5 estrellas",
          description:
            "Carmen López ha valorado tu producto Miel de Azahar con 5 estrellas. ¡Sigue así!",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
          read: true,
          category: "REVIEW",
          eventType: "NEW_REVIEW",
          priority: "LOW",
        }}
        onMarkAsRead={(id) => console.log("Marcar como leída:", id)}
      />
    </div>
  ),
};

// ─── Historia C: No leída, sin URL de acción, categoría ACCOUNT ──────────────
// Muestra el botón "Marcar como leída"

export const SinUrlConBotonLeer: Story = {
  name: "C — Sin URL de acción, muestra botón marcar como leída",
  render: () => (
    <div className="max-w-md border border-border-subtle rounded-2xl overflow-hidden bg-white">
      <NotificationCard
        notification={{
          id: "notif-003",
          title: "Tu cuenta ha sido verificada",
          description:
            "Tu identidad como productor ha sido verificada correctamente. Ya puedes publicar productos en la plataforma.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          read: false,
          category: "ACCOUNT",
          eventType: "ACCOUNT_VERIFIED",
          priority: "MEDIUM",
        }}
        onMarkAsRead={(id) => console.log("Marcar como leída:", id)}
      />
    </div>
  ),
};

// ─── Historia D: Modo compact — preview del dropdown de campana ───────────────

export const ModoCompact: Story = {
  name: "D — Modo compact (dropdown campana)",
  render: () => (
    <div className="w-80 border border-border-subtle rounded-2xl overflow-hidden bg-white shadow-origen">
      <div className="px-3 py-2 border-b border-border-subtle">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Notificaciones
        </p>
      </div>
      <div className="divide-y divide-border-subtle">
        <NotificationCard
          compact
          notification={{
            id: "notif-004",
            title: "Nuevo pedido recibido",
            description: "Has recibido el pedido #5001 de María García por 42,50 €.",
            timestamp: new Date(Date.now() - 1000 * 60 * 15),
            read: false,
            category: "ORDER",
            eventType: "NEW_ORDER",
            priority: "HIGH",
            action: { url: "/dashboard/orders/5001" },
          }}
        />
        <NotificationCard
          compact
          notification={{
            id: "notif-005",
            title: "Stock bajo: Aceite de Oliva Virgen Extra",
            description: "Solo quedan 3 unidades. Considera reabastecer el inventario.",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
            read: true,
            category: "PRODUCT",
            eventType: "PRODUCT_LOW_STOCK",
            priority: "MEDIUM",
          }}
        />
      </div>
    </div>
  ),
};

// ─── Historia E: Lista de 5 items — simula el inbox completo ─────────────────

export const ListaInbox: Story = {
  name: "E — Lista de 5 notificaciones (inbox)",
  render: () => {
    const notifications = [
      {
        id: "n1",
        title: "Alerta del sistema: mantenimiento programado",
        description:
          "La plataforma estará en mantenimiento el domingo 22 de junio de 02:00 a 04:00 (CET). Los servicios estarán temporalmente interrumpidos.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        read: false,
        category: "SYSTEM" as const,
        eventType: "SYSTEM_ALERT",
        priority: "URGENT" as const,
      },
      {
        id: "n2",
        title: "Pedido #4901 entregado",
        description: "El comprador ha confirmado la recepción del pedido. Consulta los detalles en tu panel de pedidos.",
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        read: false,
        category: "ORDER" as const,
        eventType: "ORDER_DELIVERED",
        priority: "LOW" as const,
        action: { url: "/dashboard/orders/4901" },
      },
      {
        id: "n3",
        title: "Documento próximo a caducar",
        description: "Tu certificado de producción ecológica caduca en 14 días. Renuévalo para seguir vendiendo productos certificados.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        read: false,
        category: "SYSTEM" as const,
        eventType: "DOCUMENT_EXPIRING_SOON",
        priority: "HIGH" as const,
      },
      {
        id: "n4",
        title: "Solicitud de productor aprobada",
        description: "Tu solicitud para unirte como productor verificado ha sido aprobada. Bienvenido a Origen.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22),
        read: true,
        category: "ACCOUNT" as const,
        eventType: "PRODUCER_REQUEST_APPROVED",
        priority: "MEDIUM" as const,
      },
      {
        id: "n5",
        title: "Nueva promoción creada",
        description: "Tu promoción «Especial Verano» ha sido publicada y ya es visible para los compradores en la plataforma.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
        read: true,
        category: "MARKETING" as const,
        eventType: "PROMOTION_CREATED",
        priority: "LOW" as const,
      },
    ];

    return (
      <div className="max-w-lg border border-border-subtle rounded-2xl overflow-hidden bg-white shadow-origen">
        <div className="px-4 py-3 border-b border-border-subtle sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Hoy
          </p>
        </div>
        <div role="list" className="divide-y divide-border-subtle">
          {notifications.map((n) => (
            <NotificationCard
              key={n.id}
              notification={n}
              onMarkAsRead={(id) => console.log("Marcar como leída:", id)}
            />
          ))}
        </div>
      </div>
    );
  },
};

// ─── Historia extra: Skeleton ─────────────────────────────────────────────────

export const Skeleton: StoryObj<typeof NotificationCardSkeleton> = {
  name: "Skeleton — estado de carga",
  render: () => (
    <div className="max-w-md border border-border-subtle rounded-2xl overflow-hidden bg-white">
      <div role="list" className="divide-y divide-border-subtle">
        {Array.from({ length: 4 }).map((_, i) => (
          <NotificationCardSkeleton key={i} />
        ))}
      </div>
    </div>
  ),
};
