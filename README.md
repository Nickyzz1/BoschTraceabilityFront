# Projeto Bosch Traceability System

Sistema completo para rastreabilidade de peças em uma linha de produção, desenvolvido com foco em organização, histórico e controle em tempo real. Inclui backend em C# (.NET) com SQL Server e frontend em Angular.

---

## \:hammer: Funcionalidades Principais

### Backend (C# .NET 8)

* CRUD de Peças (Parts)
* CRUD de Estações (Stations)
* Registro de movimentações de peças entre estações (Moviments)
* Validação da ordem das estações
* Atualização automática do status da peça
* Histórico de movimentações
* Testes unitários com xUnit para os principais serviços

### Frontend (Angular)

* Tela principal de gerenciamento com visualização das peças, status e estações
* Modal para edição e exclusão de peças
* Tela de movimentação com histórico e formulário de movimentação
* Interface limpa e responsiva com TailwindCSS

---

## \:file\_folder: Estrutura de Pastas

### Backend

```
Project
├── Controllers
│   ├── PartController.cs
│   ├── StationController.cs
│   └── MovimentController.cs
├── Entities
│   ├── Part.cs
│   ├── Station.cs
│   └── Moviment.cs
├── DTOs
│   ├── PartCreateDto.cs
│   ├── MovimentDto.cs
├── Services
│   ├── PartService.cs
│   ├── StationService.cs
│   └── MovimentService.cs
├── Repositories
│   └── Interfaces + Implementações (InMemory ou EF)
├── Tests
│   ├── PartServiceTests.cs
│   ├── StationServiceTests.cs
│   └── MovimentServiceTests.cs
```

### Frontend

```
src
├── app
│   ├── components
│   │   ├── part-table
│   │   ├── modal-edit-part
│   │   └── modal-confirm-delete
│   ├── pages
│   │   ├── home-admin
│   │   └── movimentar
│   ├── services
│   │   ├── part.service.ts
│   │   ├── station.service.ts
│   │   └── moviment.service.ts
├── assets
│   └── imagens, ícones etc.
```

---

## \:floppy\_disk: Banco de Dados

* Utiliza SQL Server
* Tabelas principais:

  * `Parts`: Código, Status, CurStationId
  * `Stations`: Nome, Ordem
  * `Moviments`: DataHora, PartId, FromStation, ToStation
* Integridade referencial com chaves estrangeiras

---

## \:white\_check\_mark: Testes Automatizados (xUnit)

Cobertura para:

* Validação de ordem de estação
* Rejeição de movimentações inválidas
* Atualização de status da peça após movimentação
* Verificação de código duplicado na criação de peça

---

## \:rocket: Como Rodar

### Backend

```bash
cd BoschTraceabilityApi
# Cria banco de dados automaticamente com EF
dotnet ef database update
# Roda a API
dotnet run
```

### Frontend

```bash
cd tailwindAngular
npm install
ng serve
```

---

## \:thought\_balloon: Futuras Melhorias

* Autenticação e autorização de usuários
* Filtros por período, status e estação
* Exportação de histórico para CSV ou PDF
* Dashboard com gráficos

---

## \:technologist: Desenvolvido por Ni (Nicolle)

Frontend dev apaixonada por design, realismo e esforço. Esse projeto é mais uma etapa no seu caminho pra se tornar uma dev front-end full stack de respeito kaka.

> "Esforço é o que te leva quando o talento vacila."
