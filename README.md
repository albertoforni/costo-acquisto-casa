# 🏠 Costo Acquisto Casa

**Calculate the real cost of buying a house in Italy**

A comprehensive and accurate calculator to estimate all costs associated with purchasing real estate in Italy, including taxes, duties, notary fees, agency commissions, and mortgage costs.

## ✨ Features

- 📊 **Accurate tax calculations** - Implements current Italian legislation (2024-2025)
- 🏡 **Primary vs Secondary home** - Differentiated calculations according to law
- 🏢 **Private vs Company sales** - Handles different VAT and tax scenarios
- 💰 **Agency commissions** - Automatic calculation with VAT or custom amount
- 🏦 **Mortgage costs** - Includes substitute tax, appraisal, and processing fees
- ⚖️ **Notary fees** - Notary cost estimation
- 💾 **Save and load** - Export/import your calculations in JSON format
- 🔗 **Sharing** - Share calculations via link
- 🌙 **Dark/Light theme** - Modern and responsive interface
- 📱 **PWA Ready** - Works offline and installable as an app

## 🚀 Live Demo

[Try the calculator here](https://costo-acquisto-casa.albertoforni.com/)

## 📸 Screenshots

### Dark Mode

![Dark Mode Interface](docs/images/dark-mode-screenshot.png)

### Light Mode

![Light Mode Interface](docs/images/light-mode-screenshot.png)

The calculator features a modern, responsive design with both dark and light themes. The interface is optimized for both desktop and mobile use, making it easy to calculate property purchase costs on any device.

## 🛠️ Installation and Development

### Prerequisites

- Node.js 18+
- npm

### Local Setup

```bash
# Fork the repository
git clone https://github.com/yourusername/costo-acquisto-casa.git
cd costo-acquisto-casa

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

### Production Build

```bash
# Create production build
npm run build

# Preview build
npm run preview
```

## 🏗️ Technical Architecture

- **Frontend**: SolidJS + TypeScript
- **Styling**: Tailwind CSS + DaisyUI
- **Build**: Vite
- **Validation**: Zod schemas
- **Testing**: Jest
- **PWA**: Vite PWA plugin

### Project Structure

```
src/
├── store/           # State management and business logic
│   ├── building.ts  # Property data schema
│   ├── rules.ts     # Tax and fee calculation logic
│   └── index.ts     # Main store
├── components/      # UI components
│   ├── app.tsx      # Main application component
│   ├── input.tsx    # Formatted currency input
│   ├── taxes.tsx    # Taxes and duties section
│   ├── agency.tsx   # Agency commission section
│   ├── mortgage.tsx # Mortgage section
│   ├── notary.tsx   # Notary section
│   └── total.tsx    # Summary totals
└── utils/           # Common utilities
```

## 📋 Italian Legal Framework

The calculator implements current Italian legislation for real estate purchases:

- **Registration tax**: 2% primary home, 9% secondary home (minimum €1,000)
- **VAT**: 4% primary home from company, 10% secondary home from company
- **Fixed taxes**: €50 (private sales), €200 (company sales) for cadastral and mortgage taxes
- **Mortgage substitute tax**: 0.25% primary home, 2% other properties
- **Cadastral coefficients**: 115.5 (primary home), 126 (secondary home)

### Legal Sources

- Price-value mechanism: L. 266/2005, art. 1, c. 497; DPR 131/1986, art. 52, c. 5-bis
- Substitute tax: DPR 601/1973, artt. 15-20
- 2024-2025 regulatory updates

## 🧪 Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch
```

The project includes comprehensive tests for all fiscal calculation business logic.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### How to Contribute

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Roadmap

- [ ] Support for other Italian regions with specific regulations
- [ ] PDF report export
- [ ] Multiple scenario comparison
- [ ] Cadastral income API integration
- [ ] Integrated mortgage payment calculator
- [ ] Regulatory change history

## ⚖️ License

This project is released under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Italian tax legislation for real estate purchases
- SolidJS community for the excellent framework
- Agenzia delle Entrate for official documentation

## 📞 Support

If you have questions or found a bug, please open an [issue](https://github.com/albertoforni/costo-acquisto-casa/issues).

---

**Disclaimer**: This calculator provides estimates based on current legislation. For official calculations, always consult a qualified accountant or notary.
