# Modular Deep Learning Dashboard

A single-page, modular UI for building, configuring, monitoring, and managing deep learning training runs. Built for extensibility and experimentation, designed for clarity.

## 🚀 Features

* Project configuration and training orchestration
* Real-time monitoring of loss, metrics, and system utilization
* Support for PyTorch/TensorFlow backend
* Custom model/data/tokenizer upload
* Modular, plugin-based architecture for future extensibility

## 🔧 Technologies

* **Frontend**: React.js (TailwindCSS planned post-MVP)
* **Backend**: FastAPI
* **Training Framework**: PyTorch (primary), TensorFlow (secondary)
* **Data**: JSON/YAML config management (in-memory for now)

## 📊 Current Status vs Vision

This project is currently a minimal, working proof of concept (PoC) demonstrating:

* Working **React + FastAPI** architecture
* A functional **Project Setup** form with frontend-to-backend communication
* In-memory handling of project configuration (non-persistent)

The long-term vision includes:

* **Persistent config storage** (JSON/YAML/database)
* **Training launch orchestration** via backend APIs
* **Live monitoring** of training metrics and system performance
* **TailwindCSS** for a streamlined UI (postponed for MVP deliverability)
* **CPU-optimized workflows** for low-end environments (benchmarks forthcoming)

This repo is intended to be forked, extended, and adapted — especially by developers working with limited resources who want to prototype training workflows from scratch.

## 📈 Future Plans

* Hugging Face integration for model sharing
* ArXiv-friendly export scripts
* Collaboration & cloud compute support

## 💡 Status

**In development** — first MVP planned for 06/01/2025.

* **Current phase**: Functional scaffolding and data flow validation
* **Next**: Add persistence, then integrate training orchestration and monitoring

## 🔒 Private repo — Will be made public upon first deliverable.

## 📄 License
Licensed under the [Apache License, Version 2.0](LICENSE).

## 👤 Maintainer

Anthony Underwood – \[[Send me feedback](mailto:underwoden@gmail.com) | [Visit my WordPress Blog](https://wordpress.com/overview/underwoden.wordpress.com) | [Review my Portfolio via Linktree](https://linktr.ee/underwoden)]
