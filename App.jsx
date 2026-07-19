import React, { useState, useEffect, useMemo } from 'react'
import './App.css'

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other']
const STORAGE_KEY = 'ledger.expenses.v1'

function loadInitialExpenses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (err) {
    console.warn('Could not read saved expenses:', err)
  }
  // Friendly starter data so the ledger isn't empty on first load
  return [
    { id: crypto.randomUUID(), label: 'Grocery run', amount: 42.5, category: 'Food' },
    { id: crypto.randomUUID(), label: 'Metro card top-up', amount: 20, category: 'Transport' },
    { id: crypto.randomUUID(), label: 'Electricity bill', amount: 68.2, category: 'Bills' },
  ]
}

function formatMoney(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function App() {
  const [expenses, setExpenses] = useState(loadInitialExpenses)
  const [label, setLabel] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [filter, setFilter] = useState('All')
  const [editingId, setEditingId] = useState(null)
  const [editLabel, setEditLabel] = useState('')
  const [editAmount, setEditAmount] = useState('')
  const [editCategory, setEditCategory] = useState(CATEGORIES[0])
  const [error, setError] = useState('')

  // Persist to localStorage whenever the ledger changes (stretch goal)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses])

  const total = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  )

  const biggestId = useMemo(() => {
    if (expenses.length === 0) return null
    return expenses.reduce((max, e) => (e.amount > max.amount ? e : max), expenses[0]).id
  }, [expenses])

  const visibleExpenses = useMemo(() => {
    if (filter === 'All') return expenses
    return expenses.filter((e) => e.category === filter)
  }, [expenses, filter])

  function handleSubmit(e) {
    e.preventDefault()
    const trimmedLabel = label.trim()
    const parsedAmount = parseFloat(amount)

    if (!trimmedLabel) {
      setError('Give the entry a label.')
      return
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Amount needs to be a number greater than zero.')
      return
    }

    setExpenses((prev) => [
      ...prev,
      { id: crypto.randomUUID(), label: trimmedLabel, amount: parsedAmount, category },
    ])
    setLabel('')
    setAmount('')
    setError('')
  }

  function handleDelete(id) {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
    if (editingId === id) setEditingId(null)
  }

  function startEdit(entry) {
    setEditingId(entry.id)
    setEditLabel(entry.label)
    setEditAmount(String(entry.amount))
    setEditCategory(entry.category)
  }

  function cancelEdit() {
    setEditingId(null)
  }

  function saveEdit(id) {
    const trimmedLabel = editLabel.trim()
    const parsedAmount = parseFloat(editAmount)
    if (!trimmedLabel || isNaN(parsedAmount) || parsedAmount <= 0) return

    setExpenses((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, label: trimmedLabel, amount: parsedAmount, category: editCategory } : e
      )
    )
    setEditingId(null)
  }

  const usedCategories = ['All', ...CATEGORIES]

  return (
    <div className="page">
      <div className="ledger">
        <header className="ledger-header">
          <span className="eyebrow">Personal Ledger No. 01</span>
          <h1>Expense Tracker</h1>
          <p className="subtitle">Every entry, logged and totalled — nothing hides in this book.</p>
        </header>

        <form className="entry-form" onSubmit={handleSubmit}>
          <div className="field field-label">
            <label htmlFor="label">Entry</label>
            <input
              id="label"
              type="text"
              placeholder="e.g. Coffee with client"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div className="field field-category">
            <label htmlFor="category">Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="field field-amount">
            <label htmlFor="amount">Amount</label>
            <div className="amount-input">
              <span>$</span>
              <input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn-add">Add entry</button>
          {error && <p className="form-error">{error}</p>}
        </form>

        <nav className="filter-tabs" aria-label="Filter by category">
          {usedCategories.map((c) => (
            <button
              key={c}
              className={`tab ${filter === c ? 'tab-active' : ''}`}
              onClick={() => setFilter(c)}
              type="button"
            >
              {c}
            </button>
          ))}
        </nav>

        <section className="entries">
          {visibleExpenses.length === 0 ? (
            <div className="empty-state">
              <span className="empty-mark">—</span>
              <p>No entries in <strong>{filter}</strong> yet.</p>
              <p className="empty-hint">Add one above, or choose a different category.</p>
            </div>
          ) : (
            <ul className="entry-list">
              {visibleExpenses.map((entry) => {
                const isBiggest = entry.id === biggestId && expenses.length > 1
                const isEditing = editingId === entry.id

                if (isEditing) {
                  return (
                    <li key={entry.id} className="entry-row entry-row-editing">
                      <input
                        className="edit-input edit-label"
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                      />
                      <select
                        className="edit-input edit-category"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <input
                        className="edit-input edit-amount"
                        type="number"
                        step="0.01"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                      />
                      <div className="row-actions">
                        <button className="btn-save" onClick={() => saveEdit(entry.id)} type="button">Save</button>
                        <button className="btn-cancel" onClick={cancelEdit} type="button">Cancel</button>
                      </div>
                    </li>
                  )
                }

                return (
                  <li key={entry.id} className={`entry-row ${isBiggest ? 'entry-row-biggest' : ''}`}>
                    <span className="entry-label">{entry.label}</span>
                    <span className="entry-leader" aria-hidden="true"></span>
                    <span className="entry-category">{entry.category}</span>
                    <span className={`entry-amount ${isBiggest ? 'amount-biggest' : ''}`}>
                      ${formatMoney(entry.amount)}
                    </span>
                    <div className="row-actions">
                      <button className="btn-edit" onClick={() => startEdit(entry)} type="button">Edit</button>
                      <button className="btn-delete" onClick={() => handleDelete(entry.id)} type="button">Delete</button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </section>

        <footer className="ledger-total">
          <div className="stamp">
            <span className="stamp-label">Total {filter !== 'All' ? `— ${filter}` : ''}</span>
            <span className="stamp-amount">
              ${formatMoney(visibleExpenses.reduce((sum, e) => sum + e.amount, 0))}
            </span>
          </div>
          {filter !== 'All' && (
            <p className="grand-total">Grand total across all categories: ${formatMoney(total)}</p>
          )}
        </footer>
      </div>
    </div>
  )
}
