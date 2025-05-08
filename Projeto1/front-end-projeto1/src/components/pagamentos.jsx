import { Fragment } from 'preact';
import { useSignal } from "@preact/signals";
import './../styles/pagamentos_design.css';
import Header from "./header.jsx";
import FooterRelative from "./footer-relative.jsx";
import PaymentList from "./pagamentos/PaymentList.jsx";
import PaymentSummary from "./pagamentos/PaymentSummary.jsx";
import PaymentMethod from "./pagamentos/PaymentMethod.jsx";
import PaymentHistory from "./pagamentos/PaymentHistory.jsx";
import PaymentFilter from "./pagamentos/PaymentFilter.jsx";
import PaymentNotification from "./pagamentos/PaymentNotification.jsx";
import PaymentStatistics from "./pagamentos/PaymentStatistics.jsx";
import PaymentReminder from "./pagamentos/PaymentReminder.jsx";
import PaymentInstallmentPlan from "./pagamentos/PaymentInstallmentPlan.jsx";
import PaymentDiscount from "./pagamentos/PaymentDiscount.jsx";
import PaymentReceipt from "./pagamentos/PaymentReceipt.jsx";
import {
  academicYears,
  serviceTypes,
  paymentStatus,
  paymentMethods,
  filteredPayments,
  paymentHistory,
  paymentNotifications,
  paymentReminders,
  totalDue,
  totalPaid,
  totalOverdue,
  totalSelected,
  selectedPayments,
  paymentsByType,
  paymentsByMonth,
  searchFilters,
  updateSearchFilter,
  togglePaymentSelection,
  processPayment,
  getPaymentMethod,
  dismissNotification,
  markNotificationAsRead,
  addNotification,
  dismissReminder,
  installmentPlans,
  discountTypes,
  selectedInstallmentPlan,
  selectedDiscountType,
  paymentReceipts,
  calculateDiscount,
  applyInstallmentPlan,
  applyDiscountType,
  generateReceipt
} from "../store/pagamentosStore";

const Pagamentos = () => {
    const activeTab = useSignal("pending");
    const successMessage = useSignal("");
    const selectedPaymentForDiscount = useSignal(null);
    const calculatedDiscountAmount = useSignal(0);
    const selectedReceipt = useSignal(null);

    const handleToggleSelection = (id) => {
        togglePaymentSelection(id);
    };

    const handlePayment = (ids, method) => {
        const result = processPayment(ids, method);
        if (result) {
            successMessage.value = `Pagamento processado com sucesso via ${method === "multibanco" ? "Multibanco" : "Cartão de Crédito"}!`;

            ids.forEach(id => {
                const receipt = generateReceipt(id);
                if (receipt) {
                    selectedReceipt.value = receipt;
                }
            });

            setTimeout(() => {
                successMessage.value = "";
            }, 5000);
        }
    };

    const handlePaySelected = (method) => {
        const selectedIds = selectedPayments.value.map(payment => payment.id);
        handlePayment(selectedIds, method);
    };

    const handleFilterChange = (field, value) => {
        updateSearchFilter(field, value);
    };

    const handleDismissNotification = (id) => {
        dismissNotification(id);
    };

    const handleMarkNotificationAsRead = (id) => {
        markNotificationAsRead(id);
    };

    const handleAddNotification = (notification) => {
        addNotification(notification);
    };

    const handleDismissReminder = (id) => {
        dismissReminder(id);
    };

    const handlePayFromReminder = (id) => {
        handlePayment([id], "cartao");
    };

    const handleSelectInstallmentPlan = (planId) => {
        if (selectedPayments.value.length > 0) {
            const paymentId = selectedPayments.value[0].id;
            applyInstallmentPlan(paymentId, planId);

            if (selectedPaymentForDiscount.value) {
                calculateTotalDiscount();
            }
        }
    };

    const handleSelectDiscountType = (discountId) => {
        if (selectedPayments.value.length > 0) {
            const payment = selectedPayments.value[0];
            selectedPaymentForDiscount.value = payment;
            applyDiscountType(payment.id, discountId);
            calculateTotalDiscount();
        }
    };

    const calculateTotalDiscount = () => {
        if (selectedPaymentForDiscount.value) {
            const discountId = selectedDiscountType.value ? selectedDiscountType.value.id : null;
            const planId = selectedInstallmentPlan.value ? selectedInstallmentPlan.value.id : null;

            calculatedDiscountAmount.value = calculateDiscount(
                selectedPaymentForDiscount.value.amount,
                discountId,
                planId
            );
        }
    };

    const handlePrintReceipt = () => {
        window.print();
    };

    const handleDownloadReceipt = () => {
        if (selectedReceipt.value) {
            alert(`Recibo ${selectedReceipt.value.receiptNumber} baixado como PDF.`);
        }
    };

    const handleCloseReceipt = () => {
        selectedReceipt.value = null;
    };

    const PaymentListHeader = () => (
        <div className="payment-list-header">
            <div className="payment-tabs">
                <button
                    className={`payment-tab ${activeTab.value === "pending" ? "active" : ""}`}
                    onClick={() => activeTab.value = "pending"}
                >
                    Pagamentos Pendentes
                </button>
                <button
                    className={`payment-tab ${activeTab.value === "history" ? "active" : ""}`}
                    onClick={() => activeTab.value = "history"}
                >
                    Histórico de Pagamentos
                </button>
            </div>

            {activeTab.value === "pending" && (
                <div className="payment-filters">
                    <div className="filter-group">
                        <label htmlFor="academicYear">Ano Letivo</label>
                        <select
                            id="academicYear"
                            value={searchFilters.value.academicYear}
                            onChange={(e) => handleFilterChange("academicYear", e.target.value)}
                        >
                            <option value="">Todos</option>
                            {academicYears.value.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="serviceType">Tipo de Serviço</label>
                        <select
                            id="serviceType"
                            value={searchFilters.value.serviceType}
                            onChange={(e) => handleFilterChange("serviceType", e.target.value)}
                        >
                            <option value="">Todos</option>
                            {serviceTypes.value.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            {successMessage.value && (
                <div className="success-message">
                    {successMessage.value}
                </div>
            )}
        </div>
    );

    const PaymentListEmpty = () => (
        <div className="payment-list-empty-custom">
            <p>Não foram encontrados pagamentos pendentes.</p>
            <p>Todos os seus pagamentos estão em dia!</p>
        </div>
    );

    const PaymentListFooter = () => (
        <div className="payment-list-footer-info">
            <p>Última atualização: {new Date().toLocaleDateString()}</p>
            <p>Para mais informações, entre em contato com o setor financeiro.</p>
        </div>
    );

    const PaymentHistoryHeader = () => (
        <div className="payment-history-header-info">
            <p>Aqui você pode consultar todos os pagamentos já realizados.</p>
        </div>
    );

    const MultibancoFooter = () => (
        <div className="payment-method-footer-info">
            <p>Lembre-se de guardar o comprovante de pagamento.</p>
        </div>
    );

    const CartaoFooter = () => (
        <div className="payment-method-footer-info">
            <p>Aceitamos os principais cartões de crédito: Visa, Mastercard, American Express.</p>
        </div>
    );

    const FilterHeader = () => (
        <div className="payment-filter-header-info">
            <p>Utilize os filtros abaixo para encontrar pagamentos específicos.</p>
        </div>
    );

    const FilterFooter = () => (
        <div className="payment-filter-footer-info">
            <p>Os filtros são aplicados automaticamente.</p>
        </div>
    );

    const NotificationHeader = () => (
        <div className="payment-notification-header-info">
            <p>Aqui você encontra todas as notificações relacionadas aos seus pagamentos.</p>
        </div>
    );

    const NotificationEmpty = () => (
        <div className="payment-notification-empty-info">
            <p>Você não tem novas notificações no momento.</p>
            <p>Todas as suas notificações serão exibidas aqui.</p>
        </div>
    );

    const StatisticsFooter = () => (
        <div className="payment-statistics-footer-info">
            <p>Estas estatísticas são atualizadas em tempo real.</p>
        </div>
    );

    const StatisticsChart = () => (
        <div className="payment-statistics-chart-custom">
            <div className="chart-placeholder">
                <p>Gráfico de Pagamentos por Mês</p>
                <div className="chart-bars">
                    {Object.entries(paymentsByMonth.value).map(([month, amount]) => {
                        const percentage = (amount / totalPaid.value) * 100;
                        return (
                            <div key={month} className="chart-bar-container">
                                <div className="chart-bar" style={{ height: `${percentage}%` }}></div>
                                <div className="chart-label">{month}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    const ReminderHeader = () => (
        <div className="payment-reminder-header-info">
            <p>Aqui estão os pagamentos que vencem nos próximos 30 dias.</p>
        </div>
    );

    const InstallmentPlanHeader = () => (
        <div className="installment-plan-header">
            <h3>Escolha um Plano de Prestações</h3>
            <p>Selecione um plano para dividir seu pagamento</p>
        </div>
    );

    const InstallmentPlanFooter = () => (
        <div className="installment-plan-footer">
            <p>Os planos com menos prestações oferecem maiores descontos</p>
        </div>
    );

    const ReceiptHeader = ({ onClose }) => (
        <div className="receipt-custom-header">
            <h2>Recibo de Pagamento</h2>
            <button className="btn-close-receipt" onClick={onClose}>×</button>
        </div>
    );

    const ReceiptFooter = () => (
        <div className="receipt-footer">
            <p>Este recibo é válido como comprovante de pagamento</p>
            <p>Universidade Demo - {new Date().getFullYear()}</p>
        </div>
    );

    const renderReminderContent = (reminder, daysRemaining) => (
        <div className="payment-reminder-content-custom">
            <h3>{reminder.service}</h3>
            <div className="reminder-details">
                <div className="reminder-detail">
                    <span className="detail-label">Referência:</span>
                    <span className="detail-value">{reminder.reference}</span>
                </div>
                <div className="reminder-detail">
                    <span className="detail-label">Valor:</span>
                    <span className="detail-value">{reminder.amount.toFixed(2)} EUR</span>
                </div>
                <div className="reminder-detail">
                    <span className="detail-label">Vencimento:</span>
                    <span className="detail-value">{reminder.dueDate}</span>
                </div>
                <div className="reminder-detail">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value urgency">
                        {daysRemaining < 0
                            ? `Vencido há ${Math.abs(daysRemaining)} dias`
                            : `Vence em ${daysRemaining} dias`}
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <Fragment>
            <div>
                <Header/>
            </div>

            <main>
                <section className="payments">
                    <div className="payments-main-content">
                        <div className="payments-left-column">
                            <PaymentSummary
                                totalDue={totalDue.value}
                                totalSelected={totalSelected.value}
                                pendingCount={filteredPayments.value.filter(p => p.status === "pendente").length}
                                selectedCount={selectedPayments.value.length}
                                onPaySelected={handlePaySelected}
                            />

                            <PaymentFilter
                                academicYears={academicYears.value}
                                serviceTypes={serviceTypes.value}
                                paymentStatus={paymentStatus.value}
                                currentFilters={searchFilters.value}
                                onFilterChange={handleFilterChange}
                                headerSlot={<FilterHeader />}
                                footerSlot={<FilterFooter />}
                            />

                            {activeTab.value === "pending" ? (
                                <PaymentList
                                    payments={filteredPayments.value}
                                    onToggleSelection={handleToggleSelection}
                                    onPayment={handlePayment}
                                    headerSlot={<PaymentListHeader />}
                                    emptySlot={<PaymentListEmpty />}
                                    footerSlot={<PaymentListFooter />}
                                />
                            ) : (
                                <PaymentHistory
                                    history={paymentHistory.value}
                                    getPaymentMethod={getPaymentMethod}
                                    headerSlot={<PaymentHistoryHeader />}
                                    footerSlot={<PaymentListFooter />}
                                />
                            )}

                            {activeTab.value === "pending" && (
                                <>
                                    <PaymentMethod
                                        method={getPaymentMethod("multibanco")}
                                        footerSlot={<MultibancoFooter />}
                                    />

                                    <PaymentMethod
                                        method={getPaymentMethod("cartao")}
                                        footerSlot={<CartaoFooter />}
                                    />
                                </>
                            )}
                        </div>

                        <div className="payments-right-column">
                            <PaymentNotification
                                notifications={paymentNotifications.value}
                                onDismiss={handleDismissNotification}
                                headerSlot={<NotificationHeader />}
                                emptySlot={<NotificationEmpty />}
                            />

                            {selectedPayments.value.length > 0 && (
                                <>
                                    <PaymentInstallmentPlan
                                        plans={installmentPlans.value}
                                        selectedPlan={selectedInstallmentPlan.value}
                                        onSelectPlan={handleSelectInstallmentPlan}
                                        headerSlot={<InstallmentPlanHeader />}
                                        footerSlot={<InstallmentPlanFooter />}
                                    />

                                    <PaymentDiscount
                                        discounts={discountTypes.value}
                                        selectedDiscount={selectedDiscountType.value}
                                        onSelectDiscount={handleSelectDiscountType}
                                        payment={selectedPaymentForDiscount.value}
                                        calculatedDiscount={calculatedDiscountAmount.value}
                                    />
                                </>
                            )}

                            {selectedReceipt.value && (
                                <PaymentReceipt
                                    receipt={selectedReceipt.value}
                                    onPrint={handlePrintReceipt}
                                    onDownload={handleDownloadReceipt}
                                    headerSlot={<ReceiptHeader onClose={handleCloseReceipt} />}
                                    footerSlot={<ReceiptFooter />}
                                />
                            )}

                            <PaymentStatistics
                                totalPaid={totalPaid.value}
                                totalPending={totalDue.value}
                                totalOverdue={totalOverdue.value}
                                paymentsByType={paymentsByType.value}
                                paymentsByMonth={paymentsByMonth.value}
                                footerSlot={<StatisticsFooter />}
                                chartSlot={<StatisticsChart />}
                            />

                            <PaymentReminder
                                reminders={paymentReminders.value}
                                onDismiss={handleDismissReminder}
                                onPayNow={handlePayFromReminder}
                                headerSlot={<ReminderHeader />}
                                reminderContentSlot={renderReminderContent}
                            />
                        </div>
                    </div>
                </section>
            </main>

            <div>
                <FooterRelative/>
            </div>
        </Fragment>
    );
};

export default Pagamentos;