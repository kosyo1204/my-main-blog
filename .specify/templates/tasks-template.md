---

description: "機能実装用タスクリストテンプレート"
---

<!-- ⚠️ OUTPUT LANGUAGE: All content MUST be in 日本語 (Japanese) - required by project constitution -->

# タスク: [FEATURE NAME]

**入力**: `/specs/[###-feature-name]/` からの設計ドキュメント
**前提条件**: plan.md (必須), spec.md (ユーザーストーリーに必須), research.md, data-model.md, contracts/

**テスト**: 以下の例にはテストタスクが含まれています。

⚠️ **重要: テストは憲法 I (TDD) に従って最初に作成する必須** — テストタスクは常に実装タスクより前に来ます。Red-Green-Refactor サイクルは譲歩不可です。

**構成**: タスクはユーザーストーリーでグループ化され、各ストーリーの独立した実装とテストが可能になります。

## 形式: `[ID] [P?] [Story] 説明`

- **[P]**: 並列実行可能 (異なるファイル、依存関係なし)
- **[Story]**: このタスクが属するユーザーストーリー (例: US1, US2, US3)
- **[Category]**: 憲法に基づくタスクカテゴリ (Test, Code, UX, Perf, Infra)
- 説明に正確なファイルパスを含める

## タスクカテゴリ (憲法に基づく)

- **Test** — TDD: Unit tests, integration tests (written FIRST)
- **Code** — Code Quality: Refactoring, linting, error handling, maintainability
- **UX** — User Experience: UI consistency, accessibility, localization (日本語)
- **Perf** — Performance: Bundle optimization, load time, caching, query optimization
- **Infra** — Infrastructure: Setup, dependencies, configuration, tooling

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

<!-- 
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.
  
  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 [Infra] Create project structure per implementation plan
- [ ] T002 [Infra] Initialize [language] project with [framework] dependencies
- [ ] T003 [P] [Infra] Configure linting and formatting tools (ESLint, Prettier required per Constitution II)
- [ ] T004 [P] [Infra] Setup test framework and CI/CD test execution (required for TDD per Constitution I)
- [ ] T005 [Infra] Configure 日本語 localization framework
- [ ] T006 [Infra] Setup performance monitoring and Lighthouse integration

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Constitutional requirements (must be in place):

- [ ] T007 [Infra] Code review checklist aligned with Constitution (TDD, Code Quality, UX, Performance)
- [ ] T008 [Test] Create test utilities and fixtures for Red-Green-Refactor cycle
- [ ] T009 [Code] Setup error handling standards (日本語 error messages required per Constitution III)
- [ ] T010 [UX] Define Design System components for UI consistency (Constitution III)
- [ ] T011 [Perf] Setup performance budgets and Core Web Vitals tracking (Constitution IV)

Examples of foundational tasks (adjust based on your project):

- [ ] T012 [Infra] Setup database schema and migrations framework
- [ ] T013 [P] [Infra] Implement authentication/authorization framework
- [ ] T014 [P] [Infra] Setup API routing and middleware structure
- [ ] T015 [Infra] Create base models/entities that all stories depend on
- [ ] T016 [Code] Configure error handling and logging infrastructure
- [ ] T017 [Infra] Setup environment configuration management

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 (MANDATORY per Constitution I - TDD) ⚠️

> **CRITICAL: Write these tests FIRST, ensure they FAIL before implementation. Red-Green-Refactor cycle is NON-NEGOTIABLE**

- [ ] T018 [P] [US1] [Test] Contract test for [endpoint] in tests/contract/test_[name].py
- [ ] T019 [P] [US1] [Test] Integration test for [user journey] in tests/integration/test_[name].py
- [ ] T020 [P] [US1] [Test] Unit tests for [Entity1] logic in tests/unit/test_[name].py

### Implementation for User Story 1

- [ ] T021 [P] [US1] [Code] Create [Entity1] model in src/models/[entity1].py
- [ ] T022 [P] [US1] [Code] Create [Entity2] model in src/models/[entity2].py
- [ ] T023 [US1] [Code] Implement [Service] in src/services/[service].py (depends on T021, T022)
- [ ] T024 [US1] [Code] Implement [endpoint/feature] in src/[location]/[file].py
- [ ] T025 [US1] [Code] Add validation and error handling (日本語 messages per Constitution III)
- [ ] T026 [US1] [Code] Add code comments in 日本語 for complex logic
- [ ] T027 [US1] [UX] Ensure UI consistency with Design System
- [ ] T028 [US1] [UX] Verify accessibility (WCAG 2.1 Level AA) per Constitution III
- [ ] T029 [US1] [Perf] Verify bundle size and load time targets per Constitution IV
- [ ] T030 [US1] [Code] Final code review: TDD ✓, Quality ✓, UX ✓, Performance ✓

**Checkpoint**: At this point, User Story 1 should be fully functional, tested, and Constitution-compliant

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T018 [P] [US2] Contract test for [endpoint] in tests/contract/test_[name].py
- [ ] T019 [P] [US2] Integration test for [user journey] in tests/integration/test_[name].py

### Implementation for User Story 2

- [ ] T020 [P] [US2] Create [Entity] model in src/models/[entity].py
- [ ] T021 [US2] Implement [Service] in src/services/[service].py
- [ ] T022 [US2] Implement [endpoint/feature] in src/[location]/[file].py
- [ ] T023 [US2] Integrate with User Story 1 components (if needed)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T024 [P] [US3] Contract test for [endpoint] in tests/contract/test_[name].py
- [ ] T025 [P] [US3] Integration test for [user journey] in tests/integration/test_[name].py

### Implementation for User Story 3

- [ ] T026 [P] [US3] Create [Entity] model in src/models/[entity].py
- [ ] T027 [US3] Implement [Service] in src/services/[service].py
- [ ] T028 [US3] Implement [endpoint/feature] in src/[location]/[file].py

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX [P] Additional unit tests (if requested) in tests/unit/
- [ ] TXXX Security hardening
- [ ] TXXX Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for [endpoint] in tests/contract/test_[name].py"
Task: "Integration test for [user journey] in tests/integration/test_[name].py"

# Launch all models for User Story 1 together:
Task: "Create [Entity1] model in src/models/[entity1].py"
Task: "Create [Entity2] model in src/models/[entity2].py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
