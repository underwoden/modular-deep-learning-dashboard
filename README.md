# Modular Deep Learning Dashboard

A single-page, modular UI for building, configuring, monitoring, and managing deep learning training runs.  
Built for extensibility and experimentation, designed for clarity.

---

## 🚀 Features

- ✅ Project configuration and training orchestration
- ✅ Real-time system utilization monitoring (CPU & memory)
- ✅ Simulated training loop with loss/accuracy tracking
- ✅ Persistent configuration and output storage (JSON-based)
- ✅ Modular backend with typed model outputs and pluggable logic
- ✅ Frontend visualization of training metrics (via React)
- ✅ Fully working FastAPI backend and React frontend
- ✅ TailwindCSS-compatible JSX styling

---

## 🔧 Technologies

- **Frontend**: React.js (with TailwindCSS-compatible JSX classes)
- **Backend**: FastAPI (Python 3.10+)
- **Training Framework**: PyTorch (primary), TensorFlow (planned)
- **Data Format**: JSON/YAML (current: JSON)
- **Storage**: Local config/output files with unique run IDs

---

## 📊 Current Status: MVP v0.1.2

This release marks an upgrade from proof-of-concept to a minimal viable prototype, with:

- Working full-stack architecture
- Real-time system metric reporting
- Pluggable training config interface
- Output metrics saved per run ID
- Retrain suggestion utility scaffolded
- Summary-ready output model for evaluation

---

## ✅ MVP Goals Met

| Goal | Status |
|------|--------|
| React + FastAPI working together | ✅ |
| Page-by-page modular forms       | ✅ |
| Frontend-to-backend config flow  | ✅ |
| In-memory → Persistent config    | ✅ |
| Tailwind-compatible design       | ✅ |
| Local-friendly, low-resource     | ✅ |
| Multi-run output evaluation      | ✅ |

---

## 📈 Next Steps

- Real-time loss/accuracy chart updates in frontend
- YAML config import/export support
- Backend-triggered training queue and orchestration
- Full Tailwind build/styling pipeline
- "Best Run" summary view with retrain suggestions
- Interactive documentation per form page
- TensorFlow and Hugging Face integration (planned)
- arXiv-style reproducibility export (planned)
- **Optional local desktop launcher for full-stack startup** (planned)

---

## 🧠 Development Notes

- Designed for low-resource environments (e.g., 3GB RAM Dell Inspiron 15-3573)
- CPU-optimized, dev-tested for constrained hardware
- Emphasizes:
  - Alignment-friendly, modular workflows
  - Config-driven deep learning design
  - Persistent, interpretable model configuration and output

---

## 🔧 Configuration + Output Storage

- Configs: `~/.modular_dl_dashboard/configs/{run_id}.json`
- Outputs: `outputs/{run_id}.json`
- Each run is uniquely identified and re-loadable for future experiments

---

## 🤝 Community Use

This repo is intended to be forked, extended, and reused — especially by:

- Developers prototyping deep learning pipelines
- AI hobbyists working on limited hardware
- Students learning backend/frontend ML infrastructure
- Alignment researchers building interpretable training tools

---

## 📜 License

Licensed under the Apache License, Version 2.0

---

## 👤 Maintainer

Anthony Underwood – \[[Send me feedback](mailto:underwoden@gmail.com) | [Visit my WordPress Blog](https://wordpress.com/overview/underwoden.wordpress.com) | [Review my Portfolio via Linktree](https://linktr.ee/underwoden)]

---

🧠 *Pretrain Your Brain!*


