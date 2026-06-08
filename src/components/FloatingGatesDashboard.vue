<script setup>
import { ref } from 'vue'
import logo from '../assets/floatinggates-logo.svg'

const branch = ref('production')
const compute = ref('Primary')
const activeTab = ref(2)

const ramPoints = [
  [0, 150], [60, 150], [120, 150], [170, 90], [230, 150], [290, 150],
  [350, 150], [410, 150], [470, 150], [530, 150], [590, 150], [650, 150],
  [710, 150], [760, 150],
]
const cuPoints = [
  [0, 170], [60, 170], [120, 170], [170, 40], [230, 170], [290, 170],
  [300, 160], [320, 165], [350, 168], [410, 168], [470, 168], [530, 168],
  [590, 168], [650, 168], [710, 168], [760, 168],
]

function interpolateY(points, x) {
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i]
    const [x2, y2] = points[i + 1]
    if (x >= x1 && x <= x2) {
      const t = x2 === x1 ? 0 : (x - x1) / (x2 - x1)
      return y1 + (y2 - y1) * t
    }
  }
  return points[points.length - 1][1]
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

const CHART_WIDTH = 760
const CHART_HEIGHT = 220
const TOOLTIP_WIDTH = 190

const hover = ref(null)

function onChartMove(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  const relX = event.clientX - rect.left
  const xFrac = clamp(relX / rect.width, 0, 1)
  const svgX = xFrac * CHART_WIDTH

  const ramY = interpolateY(ramPoints, svgX)
  const cuY = interpolateY(cuPoints, svgX)

  const cuVal = ((CHART_HEIGHT - cuY) / CHART_HEIGHT * 6).toFixed(1)
  const ramVal = ((CHART_HEIGHT - ramY) / CHART_HEIGHT * 8).toFixed(1)

  const totalMinutes = Math.round(xFrac * 24 * 60)
  const hours24 = Math.floor(totalMinutes / 60) % 24
  const minutes = totalMinutes % 60
  const period = hours24 < 12 ? 'AM' : 'PM'
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12
  const time = `JAN 13, 2026 ${hours12}:${String(minutes).padStart(2, '0')} ${period}`

  hover.value = {
    left: clamp(relX - TOOLTIP_WIDTH / 2, 8, rect.width - TOOLTIP_WIDTH - 8),
    cursorX: svgX,
    cuY,
    ramY,
    cuVal,
    ramVal,
    time,
  }
}

function onChartLeave() {
  hover.value = null
}

const stats = [
  {
    label: 'Documents coming from cloud',
    value: '28',
    progress: 100,
    caption: 'All registered active projects',
  },
  {
    label: 'Locally documents under analysis',
    value: '26',
    total: '54',
    progress: 48,
    caption: '48% tied to local CAD libraries',
  },
  {
    label: 'Possible manufacturing issues',
    value: '12',
    highlight: true,
    badge: 'Requires attention',
  },
  {
    label: 'Connected endpoints',
    value: '3',
    dots: true,
    caption: 'Active operational local directories',
  },
]
</script>

<template>
  <div class="dashboard">
    <aside class="sidebar">
      <div class="brand">
        <img class="brand-logo" :src="logo" alt="FloatingGates" />
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

      <section class="stats-grid">
        <article
          v-for="stat in stats"
          :key="stat.label"
          class="card stat-card"
          :class="{ 'is-highlight': stat.highlight }"
        >
          <p class="stat-label">{{ stat.label }}</p>
          <p class="stat-value">
            {{ stat.value }}<span v-if="stat.total" class="stat-total"> / {{ stat.total }}</span>
          </p>

          <div v-if="stat.progress != null" class="progress-track">
            <div
              class="progress-fill"
              :class="{ 'is-accent': stat.progress < 100 }"
              :style="{ width: stat.progress + '%' }"
            ></div>
          </div>

          <div v-if="stat.dots" class="dots-row">
            <span class="stat-dot" v-for="n in 3" :key="n"></span>
          </div>

          <p v-if="stat.badge" class="stat-badge">
            <i class="badge-dot"></i>{{ stat.badge }}
          </p>
          <p v-else-if="stat.caption" class="stat-caption">{{ stat.caption }}</p>
        </article>
      </section>

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

        <div class="chart" @mousemove="onChartMove" @mouseleave="onChartLeave">
          <div class="chart-handle top"></div>
          <div class="chart-handle bottom"></div>

          <div
            v-if="hover"
            class="tooltip"
            :style="{ left: hover.left + 'px' }"
          >
            <span class="tooltip-date">{{ hover.time }}</span>
            <span class="tooltip-row"><i class="swatch cu"></i>CU Usage <strong>{{ hover.cuVal }}</strong></span>
            <span class="tooltip-row"><i class="swatch ram"></i>RAM usage <strong>{{ hover.ramVal }} GB</strong></span>
          </div>

          <svg class="chart-svg" viewBox="0 0 760 220" preserveAspectRatio="none">
            <line
              v-if="hover"
              :x1="hover.cursorX" y1="0" :x2="hover.cursorX" y2="220"
              class="cursor-line"
            />
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
            <template v-if="hover">
              <circle :cx="hover.cursorX" :cy="hover.cuY" r="4" class="point cu" />
              <circle :cx="hover.cursorX" :cy="hover.ramY" r="4" class="point ram" />
            </template>
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
  background: #eef1f3;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  color: #21333f;
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
.brand-logo {
  height: 28px;
  width: auto;
  display: block;
}

.section-label {
  font-size: 11px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #9aa6ad;
  margin: 0 0 8px;
  font-weight: 600;
}

.picker {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #e2e6e9;
  border-radius: 8px;
  padding: 8px 10px;
  margin-bottom: 14px;
  cursor: pointer;
  box-sizing: border-box;
}
.picker-icon {
  color: #6c7c87;
  font-size: 14px;
}
.skeleton-bar {
  flex: 1;
  height: 8px;
  border-radius: 4px;
  background: #e7eaed;
}
.chevron {
  color: #c5cdd2;
  font-size: 10px;
  letter-spacing: -2px;
}
.chevron-sm {
  color: #b3bdc4;
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
  color: #5b6b75;
  text-decoration: none;
  font-size: 13.5px;
}
.nav-item:hover {
  background: #f4f6f7;
}
.nav-item.is-active {
  background: #fbeee8;
  color: #c1644a;
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
  font-weight: 700;
  letter-spacing: -0.4px;
  margin: 0;
  color: #21333f;
}
.tab-dots {
  display: flex;
  gap: 6px;
}
.dot {
  width: 26px;
  height: 16px;
  border-radius: 4px;
  background: #dde2e6;
}
.dot.active {
  background: #dd8266;
}

.card {
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e6e9ec;
  padding: 22px;
  box-sizing: border-box;
}
.card h2 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px;
  color: #21333f;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-bottom: 18px;
}
.stat-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.stat-card.is-highlight {
  background: #fdf0ee;
  border-color: #f3cec5;
}
.stat-label {
  font-size: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-weight: 700;
  color: #5b6b75;
  margin: 0;
}
.is-highlight .stat-label {
  color: #21333f;
}
.stat-value {
  font-size: 30px;
  font-weight: 800;
  color: #21333f;
  margin: 0;
  line-height: 1;
}
.is-highlight .stat-value {
  color: #d35a3f;
}
.stat-total {
  font-size: 18px;
  font-weight: 500;
  color: #97a3ab;
}

.progress-track {
  height: 6px;
  border-radius: 3px;
  background: #e6e9ec;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 3px;
  background: #21333f;
}
.progress-fill.is-accent {
  background: #dd8266;
}

.dots-row {
  display: flex;
  gap: 5px;
}
.stat-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #97a3ab;
  display: inline-block;
}

.stat-caption {
  font-size: 12.5px;
  color: #8a98a1;
  margin: 0;
}
.stat-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #d35a3f;
  background: #fbe3df;
  border-radius: 8px;
  padding: 10px 14px;
  margin: 0;
}
.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #d35a3f;
  display: inline-block;
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
  color: #8a98a1;
}
.dropdown {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1px solid #e2e6e9;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13.5px;
  cursor: pointer;
  color: #21333f;
}
.status {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #5b6b75;
}
.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #dd8266;
  display: inline-block;
}
.refresh {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #e2e6e9;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13.5px;
  cursor: pointer;
  color: #21333f;
  margin-left: auto;
}
.refresh-icon {
  color: #8a98a1;
}

.chart {
  position: relative;
  height: 220px;
  border-radius: 10px;
  overflow: hidden;
  cursor: crosshair;
  background:
    repeating-linear-gradient(
      135deg,
      rgba(61, 90, 112, 0.05) 0 1px,
      transparent 1px 10px
    ),
    #fbfbfc;
  border: 1px solid #eef1f3;
}
.chart-handle {
  position: absolute;
  left: 14px;
  width: 22px;
  height: 6px;
  border-radius: 4px;
  background: #d6dbdf;
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
  stroke: #c8ced2;
  stroke-width: 1;
  stroke-dasharray: 3 3;
}
.line {
  stroke-width: 2;
}
.line.cu {
  stroke: #3d5a70;
}
.line.ram {
  stroke: #dd8266;
  stroke-dasharray: 2 4;
}
.point {
  stroke: #fff;
  stroke-width: 2;
}
.point.cu {
  fill: #3d5a70;
}
.point.ram {
  fill: #dd8266;
}

.tooltip {
  position: absolute;
  top: 24px;
  pointer-events: none;
  background: #fff;
  border: 1px solid #e6e9ec;
  border-radius: 10px;
  padding: 12px 14px;
  box-shadow: 0 8px 24px rgba(33, 51, 63, 0.1);
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
  color: #8a98a1;
  font-weight: 600;
  margin-bottom: 2px;
}
.tooltip-row {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #5b6b75;
}
.tooltip-row strong {
  margin-left: auto;
  color: #21333f;
  font-weight: 600;
}
.swatch {
  width: 10px;
  height: 2px;
  border-radius: 1px;
  display: inline-block;
}
.swatch.cu {
  background: #3d5a70;
}
.swatch.ram {
  background: #dd8266;
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
  color: #21333f;
}
.pause-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f4f6f7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #5b6b75;
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
