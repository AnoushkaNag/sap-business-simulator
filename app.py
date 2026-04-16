import streamlit as st
import pandas as pd

st.set_page_config(page_title="SAP Simulator", layout="wide")
st.title("SAP Business Process Simulator")
st.caption("Simulating SAP MM, PP, SD, and FI Integration")

# ---------------- SESSION STATE ----------------
if "raw_material" not in st.session_state:
    st.session_state.raw_material = 0
if "finished_goods" not in st.session_state:
    st.session_state.finished_goods = 0
if "revenue" not in st.session_state:
    st.session_state.revenue = 0
if "expenses" not in st.session_state:
    st.session_state.expenses = 0
if "history" not in st.session_state:
    st.session_state.history = []


def procurement_section():
    st.header("Procure-to-Pay (SAP MM)")
    col1, col2 = st.columns([2, 1])
    with col1:
        vendor = st.text_input("Vendor Name")
        qty = st.number_input("Raw Material Quantity", min_value=0)

        if st.button("Create Purchase Order"):
            cost = qty * 10
            st.session_state.raw_material += qty
            st.session_state.expenses += cost
            st.session_state.history.append({"Type": "Purchase", "Amount": cost})
            st.success(f"Purchased {qty} units | Cost ₹{cost}")

    with col2:
        st.info(f"Raw Material Available: {st.session_state.raw_material}")


def production_section():
    st.header("Plan-to-Produce (SAP PP)")
    produce_qty = st.number_input("Production Quantity", min_value=0)
    if st.button("Run Production"):
        if produce_qty <= st.session_state.raw_material:
            st.session_state.raw_material -= produce_qty
            st.session_state.finished_goods += produce_qty
            st.success(f"Produced {produce_qty} units")
        else:
            st.error("Not enough raw material")

    st.info(f"Finished Goods: {st.session_state.finished_goods}")


def sales_section():
    st.header("Order-to-Cash (SAP SD)")
    customer = st.text_input("Customer Name")
    sale_qty = st.number_input("Sales Quantity", min_value=0)

    if st.button("Create Sales Order"):
        if sale_qty <= st.session_state.finished_goods:
            value = sale_qty * 20
            st.session_state.finished_goods -= sale_qty
            st.session_state.revenue += value
            st.session_state.history.append({"Type": "Sale", "Amount": value})
            st.success(f"Sold {sale_qty} units | Revenue ₹{value}")
        else:
            st.error("Not enough finished goods")


def reports_section():
    st.header("Financial Reports (FI)")
    profit = st.session_state.revenue - st.session_state.expenses
    c1, c2, c3 = st.columns(3)
    c1.metric("Revenue", f"₹{st.session_state.revenue}")
    c2.metric("Expenses", f"₹{st.session_state.expenses}")
    c3.metric("Profit", f"₹{profit}")

    df = pd.DataFrame(st.session_state.history)
    if not df.empty:
        st.subheader("Transaction Analysis")
        st.bar_chart(df.groupby("Type").sum())

    if st.button("Reset Simulation"):
        for key in list(st.session_state.keys()):
            del st.session_state[key]
        st.experimental_rerun()


def dashboard_section():
    st.header("Dashboard Overview")
    profit = st.session_state.revenue - st.session_state.expenses
    m1, m2, m3 = st.columns(3)
    m1.metric("Revenue", f"₹{st.session_state.revenue}")
    m2.metric("Expenses", f"₹{st.session_state.expenses}")
    m3.metric("Profit", f"₹{profit}")

    # Inventory
    st.subheader("Inventory Levels")
    inv_col1, inv_col2 = st.columns([1, 2])
    with inv_col1:
        st.metric("Raw Material", st.session_state.raw_material)
        st.metric("Finished Goods", st.session_state.finished_goods)
    with inv_col2:
        inv_df = pd.DataFrame({
            "Quantity": [st.session_state.raw_material, st.session_state.finished_goods]
        }, index=["Raw Material", "Finished Goods"])
        st.bar_chart(inv_df)

    # Financials over time
    st.subheader("Revenue / Expenses / Profit Over Time")
    df = pd.DataFrame(st.session_state.history)
    if df.empty:
        st.info("No transactions yet. Perform purchases or sales to populate charts.")
    else:
        df_exp = df.copy()
        df_exp["revenue"] = df_exp["Amount"].where(df_exp["Type"] == "Sale", 0)
        df_exp["expense"] = df_exp["Amount"].where(df_exp["Type"] == "Purchase", 0)
        df_exp["cum_revenue"] = df_exp["revenue"].cumsum()
        df_exp["cum_expenses"] = df_exp["expense"].cumsum()
        df_exp["profit"] = df_exp["cum_revenue"] - df_exp["cum_expenses"]

        chart_df = df_exp[["cum_revenue", "cum_expenses", "profit"]].copy()
        chart_df.index = range(1, len(chart_df) + 1)
        chart_df.index.name = "Txn #"
        st.line_chart(chart_df)

        # Recent transactions
        st.subheader("Recent Transactions")
        recent = df.tail(10).reset_index(drop=True)
        start_idx = max(1, len(df) - len(recent) + 1)
        recent.index = range(start_idx, start_idx + len(recent))
        recent.index.name = "Txn #"
        st.dataframe(recent)

    # Quick Actions and Insights
    st.subheader("Quick Actions")
    a1, a2, a3 = st.columns(3)
    with a1:
        st.button("Create Purchase Order", key="dash_po")
    with a2:
        st.button("Run Production", key="dash_prod")
    with a3:
        st.button("Create Sales Order", key="dash_sale")

    st.subheader("Business Insights")
    if st.button("Generate Insights"):
        if profit > 0:
            st.success("Business is profitable. Consider scaling production.")
        elif profit < 0:
            st.warning("Business is at a loss. Reduce procurement or increase sales.")
        else:
            st.info("Break-even point reached.")


# ---------------- SIDEBAR NAVIGATION ----------------
st.sidebar.title("Navigation")
choice = st.sidebar.radio("Go to", [
    "📊 Dashboard",
    "🛒 Procurement (MM)",
    "🏭 Production (PP)",
    "💰 Sales (SD)",
    "📈 Financial Reports (FI)"
])

if choice == "📊 Dashboard":
    dashboard_section()
elif choice == "🛒 Procurement (MM)":
    procurement_section()
elif choice == "🏭 Production (PP)":
    production_section()
elif choice == "💰 Sales (SD)":
    sales_section()
elif choice == "📈 Financial Reports (FI)":
    reports_section()
