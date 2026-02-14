<!-- ⚠️ OUTPUT LANGUAGE: All content MUST be in 日本語 (Japanese) - required by project constitution -->

# 機能仕様書: [FEATURE NAME]

**機能ブランチ**: `[###-feature-name]`  
**作成日**: [DATE]  
**ステータス**: ドラフト  
**入力**: ユーザー説明: "$ARGUMENTS"

## ユーザーシナリオとテスト *（必須）*

<!--
  重要: ユーザーストーリーは重要度の順にユーザージャーニーとして優先順位付けする必要があります。
  各ユーザーストーリー/ジャーニーは独立してテスト可能である必要があります。
  つまり、それらの1つだけを実装しても、価値を提供する実行可能な MVP (最小実行可能製品) が得られるべきです。
  
  各ストーリーに優先度 (P1, P2, P3 など) を割り当てます。P1 が最も重要です。
  各ストーリーを、以下の特性を持つ機能の独立したスライスと考えてください：
  - 独立して開発可能
  - 独立してテスト可能
  - 独立してデプロイ可能
  - ユーザーに独立して実演可能
-->

### ユーザーストーリー 1 - [簡潔なタイトル] (優先度: P1)

[このユーザージャーニーを平易な言葉で説明してください]

**この優先度の理由**: [その価値とこの優先度レベルを持つ理由を説明してください]

**独立テスト**: [これを独立してテストする方法を説明してください。例: "[具体的なアクション] によって完全にテスト可能で、[具体的な価値] を提供できます"]

**受け入れシナリオ**:

1. **前提** [初期状態]、**実行時** [アクション]、**結果** [期待される結果]
2. **前提** [初期状態]、**実行時** [アクション]、**結果** [期待される結果]

---

### User Story 2 - [Brief Title] (Priority: P2)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 3 - [Brief Title] (Priority: P3)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- What happens when [boundary condition]?
- How does system handle [error scenario]?

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: System MUST [specific capability, e.g., "allow users to create accounts"]
- **FR-002**: System MUST [specific capability, e.g., "validate email addresses"]  
- **FR-003**: Users MUST be able to [key interaction, e.g., "reset their password"]
- **FR-004**: System MUST [data requirement, e.g., "persist user preferences"]
- **FR-005**: System MUST [behavior, e.g., "log all security events"]

*Example of marking unclear requirements:*

- **FR-006**: System MUST authenticate users via [NEEDS CLARIFICATION: auth method not specified - email/password, SSO, OAuth?]
- **FR-007**: System MUST retain user data for [NEEDS CLARIFICATION: retention period not specified]

### Constitution Compliance Requirements

my-main-blog Constitution v1.0.0 に基づく必須要件：

#### I. Test-Driven Development
- **TR-001**: Unit tests are written BEFORE implementation (Red Phase)
- **TR-002**: Integration tests cover key user journeys
- **TR-003**: Tests must be reviewed and approved with feature specification

#### II. Code Quality
- **TR-004**: Code must pass ESLint / Prettier checks
- **TR-005**: Cyclomatic complexity must be ≤ 10 per function
- **TR-006**: All error cases must have explicit error handling
- **TR-007**: Code comments (in 日本語) for complex logic

#### III. User Experience Consistency
- **TR-008**: UI components use project design system
- **TR-009**: All user-facing messages are in 日本語 with clear actions
- **TR-010**: Accessibility compliant (WCAG 2.1 Level AA minimum)

#### IV. Performance Requirements
- **TR-011**: Page load time (FCP) ≤ 1.5 seconds
- **TR-012**: Bundle size < 150 KB (gzip)
- **TR-013**: Response time for user interactions ≤ 300ms

### Key Entities *(include if feature involves data)*

- **[Entity 1]**: [What it represents, key attributes without implementation]
- **[Entity 2]**: [What it represents, relationships to other entities]

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: [Measurable metric, e.g., "Users can complete account creation in under 2 minutes"]
- **SC-002**: [Measurable metric, e.g., "System handles 1000 concurrent users without degradation"]
- **SC-003**: [User satisfaction metric, e.g., "90% of users successfully complete primary task on first attempt"]
- **SC-004**: [Business metric, e.g., "Reduce support tickets related to [X] by 50%"]
