<script setup>
import { ref } from 'vue'

const branch = ref('production')
const compute = ref('Primary')
const activeTab = ref(2)
</script>

<template>
  <div class="dashboard">
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M12 2 2 7l10 5 10-5-10-5Z" fill="#ff3621" />
            <path d="m2 12 10 5 10-5" fill="none" stroke="#ff3621" stroke-width="2" />
            <path d="m2 17 10 5 10-5" fill="none" stroke="#ff3621" stroke-width="2" opacity="0.5" />
          </svg>
          <span class="brand-name">databricks</span>
        </span>
        <span class="brand-divider"></span>
        <span class="brand-mark">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <rect x="3" y="6" width="18" height="2.5" rx="1.25" fill="#ff3621" />
            <rect x="3" y="11" width="14" height="2.5" rx="1.25" fill="#ff3621" />
            <rect x="3" y="16" width="10" height="2.5" rx="1.25" fill="#ff3621" />
          </svg>
          <span class="brand-name">Lakebase</span>
        </span>
      </div>

      <p class="section-label">Autoscaling project</p>
      <button class="picker">
        <span class="picker-icon">◈</span>
        <span class="skeleton-bar"></span>
        <span class="chevron">⌃⌄</span>
      </button>
      <nav class="nav">
        <a class="nav-item is-active" href="#">
          <span class="nav-icon">▦</span> Dashboard
        </a>
        <a class="nav-item" href="#">
          <span class="nav-icon">⑂</span> Branches
        </a>
        <a class="nav-item" href="#">
          <span class="nav-icon">⚙</span> Settings
        </a>
      </nav>

      <p class="section-label">Branch</p>
      <button class="picker">
        <span class="picker-icon">⑂</span>
        <span class="skeleton-bar"></span>
        <span class="chevron">⌃⌄</span>
      </button>
      <nav class="nav">
        <a class="nav-item" href="#">
          <span class="nav-icon">▦</span> Overview
        </a>
        <a class="nav-item" href="#">
          <span class="nav-icon">📈</span> Monitoring
        </a>
        <a class="nav-item" href="#">
          <span class="nav-icon">🖉</span> SQL Editor
        </a>
        <a class="nav-item" href="#">
          <span class="nav-icon">⊞</span> Tables
        </a>
        <a class="nav-item" href="#">
          <span class="nav-icon">↻</span> Backup &amp; Restore
        </a>
      </nav>
    </aside>

    <main class="content">
      <header class="content-header">
        <h1>Project Dashboard</h1>
        <div class="tab-dots">
          <span v-for="n in 3" :key="n" class="dot" :class="{ active: n === activeTab }" />
        </div>
      </header>

      <section class="card monitoring">
        <h2>Monitoring</h2>
        <div class="filters">
          <div class="field">
            <span class="field-label">Branch</span>
            <button class="dropdown">
              {{ branch }} <strong>Default</strong> <span class="chevron-sm">⌄</span>
            </button>
          </div>
          <div class="field">
            <span class="field-label">Compute</span>
            <button class="dropdown">
              {{ compute }} <span class="status"><i class="status-dot"></i> Active</span>
              <span class="chevron-sm">⌄</span>
            </button>
          </div>
          <button class="refresh">
            <span class="refresh-icon">⟳</span> Refresh
          </button>
        </div>

        <div class="chart">
          <div class="chart-handle top"></div>
          <div class="chart-handle bottom"></div>

          <div class="tooltip">
            <span class="tooltip-date">JAN 13, 2026 8:16:34 AM</span>
            <span class="tooltip-row"><i class="swatch cu"></i>CU Usage <strong>0.0₂</strong></span>
            <span class="tooltip-row"><i class="swatch ram"></i>RAM usage <strong>2.9₀ GB</strong></span>
          </div>

          <svg class="chart-svg" viewBox="0 0 760 220" preserveAspectRatio="none">
            <line x1="170" y1="0" x2="170" y2="220" class="cursor-line" />
            <polyline
              class="line ram"
              fill="none"
              points="0,150 60,150 120,150 170,90 230,150 290,150 350,150 410,150 470,150 530,150 590,150 650,150 710,150 760,150"
            />
            <polyline
              class="line cu"
              fill="none"
              points="0,170 60,170 120,170 170,40 230,170 290,170 300,160 320,165 350,168 410,168 470,168 530,168 590,168 650,168 710,168 760,168"
            />
            <circle cx="170" cy="40" r="4" class="point cu" />
            <circle cx="170" cy="90" r="4" class="point ram" />
          </svg>
        </div>
      </section>

      <section class="lower-cards">
        <article class="card">
          <h3>1 Branch</h3>
        </article>
        <article class="card">
          <header class="card-row">
            <h3>Project Settings</h3>
            <span class="pause-btn">❚❚</span>
          </header>
        </article>
      </section>
    </main>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background: #eef0f3;
  font-family: 'Söhne', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  color: #1b1b1f;
  font-size: 14px;
}

/* Sidebar */
.sidebar {
  width: 248px;
  flex-shrink: 0;
  background: #fff;
  padding: 20px 16px;
  box-sizing: border-box;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
}
.brand-mark {
  display: flex;
  align-items: center;
  gap: 6px;
}
.brand-name {
  font-weight: 600;
  font-size: 15px;
  letter-spacing: -0.2px;
}
.brand-divider {
  width: 1px;
  height: 18px;
  background: #d8d9dd;
}

.section-label {
  font-size: 11px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #9a99a3;
  margin: 0 0 8px;
  font-weight: 600;
}

.picker {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #e3e3e8;
  border-radius: 8px;
  padding: 8px 10px;
  margin-bottom: 14px;
  cursor: pointer;
  box-sizing: border-box;
}
.picker-icon {
  color: #6b6b75;
  font-size: 14px;
}
.skeleton-bar {
  flex: 1;
  height: 8px;
  border-radius: 4px;
  background: #e6e6ec;
}
.chevron {
  color: #c7c7cf;
  font-size: 10px;
  letter-spacing: -2px;
}
.chevron-sm {
  color: #b4b4bd;
  font-size: 11px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 24px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 6px;
  color: #57565f;
  text-decoration: none;
  font-size: 13.5px;
}
.nav-item:hover {
  background: #f4f4f7;
}
.nav-item.is-active {
  background: #eef1ff;
  color: #2f3349;
  font-weight: 600;
}
.nav-icon {
  width: 16px;
  text-align: center;
  font-size: 13px;
}

/* Main content */
.content {
  flex: 1;
  padding: 28px 36px;
  box-sizing: border-box;
}

.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.content-header h1 {
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.4px;
  margin: 0;
  color: #1b1b1f;
}
.tab-dots {
  display: flex;
  gap: 6px;
}
.dot {
  width: 26px;
  height: 16px;
  border-radius: 4px;
  background: #dde0e6;
}
.dot.active {
  background: #2f4ed1;
}

.card {
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e7e8ec;
  padding: 22px;
  box-sizing: border-box;
}
.card h2 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px;
}

.monitoring {
  margin-bottom: 18px;
}

.filters {
  display: flex;
  align-items: flex-end;
  gap: 28px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field-label {
  font-size: 12px;
  color: #8c8b95;
}
.dropdown {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1px solid #e3e3e8;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13.5px;
  cursor: pointer;
  color: #1b1b1f;
}
.status {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #57565f;
}
.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #21a366;
  display: inline-block;
}
.refresh {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #e3e3e8;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13.5px;
  cursor: pointer;
  color: #1b1b1f;
  margin-left: auto;
}
.refresh-icon {
  color: #8c8b95;
}

.chart {
  position: relative;
  height: 220px;
  border-radius: 10px;
  overflow: hidden;
  background:
    repeating-linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.035) 0 1px,
      transparent 1px 10px
    ),
    #fbfbfc;
  border: 1px solid #eef0f3;
}
.chart-handle {
  position: absolute;
  left: 14px;
  width: 22px;
  height: 6px;
  border-radius: 4px;
  background: #d8d9de;
  z-index: 2;
}
.chart-handle.top {
  top: 12px;
}
.chart-handle.bottom {
  bottom: 12px;
}

.chart-svg {
  width: 100%;
  height: 100%;
  display: block;
}
.cursor-line {
  stroke: #c9cbd2;
  stroke-width: 1;
  stroke-dasharray: 3 3;
}
.line {
  stroke-width: 2;
}
.line.cu {
  stroke: #2f6fed;
}
.line.ram {
  stroke: #21a366;
  stroke-dasharray: 2 4;
}
.point {
  stroke: #fff;
  stroke-width: 2;
}
.point.cu {
  fill: #2f6fed;
}
.point.ram {
  fill: #21a366;
}

.tooltip {
  position: absolute;
  top: 38px;
  left: 60px;
  background: #fff;
  border: 1px solid #e7e8ec;
  border-radius: 10px;
  padding: 12px 14px;
  box-shadow: 0 8px 24px rgba(20, 20, 30, 0.08);
  font-size: 12.5px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 3;
  min-width: 190px;
}
.tooltip-date {
  font-size: 11px;
  letter-spacing: 0.4px;
  color: #8c8b95;
  font-weight: 600;
  margin-bottom: 2px;
}
.tooltip-row {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #57565f;
}
.tooltip-row strong {
  margin-left: auto;
  color: #1b1b1f;
  font-weight: 600;
}
.swatch {
  width: 10px;
  height: 2px;
  border-radius: 1px;
  display: inline-block;
}
.swatch.cu {
  background: #2f6fed;
}
.swatch.ram {
  background: #21a366;
}

.lower-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
.lower-cards .card {
  min-height: 64px;
}
.card-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.lower-cards h3 {
  font-size: 15px;
  font-weight: 600;
  margin: 0;
}
.pause-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f4f4f7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #6b6b75;
  letter-spacing: -1px;
}

@media (max-width: 880px) {
  .dashboard {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
  }
  .lower-cards {
    grid-template-columns: 1fr;
  }
}
</style>
