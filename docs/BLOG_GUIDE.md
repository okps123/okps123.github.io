# 블로그 운영 가이드 (AstroPaper + GitHub Pages)

## 현재 배포 주소
- https://okps123.github.io/

## 글 작성 위치
- `src/data/blog/*.md`

## 새 글 작성 템플릿
```md
---
author: Jake
pubDatetime: 2026-02-26T09:00:00+09:00
title: 글 제목
slug: url-slug
featured: false
draft: false
tags:
  - engineering
description: 한 줄 설명
---

본문
```

## 자주 쓰는 명령어
```bash
# 로컬 실행
npm run dev

# 빌드 확인
npm run build
```

## 배포 방식
- `main` 브랜치에 push 하면 GitHub Actions가 자동 배포
- 워크플로우: `.github/workflows/deploy-pages.yml`

## 추천 운영 규칙
1. 한 포스트 = 한 메시지 (핵심만)
2. 제목은 검색형(문제/해결 중심)
3. 포스트 말미에 "다음 액션" 2~3개 남기기

## 기본 커스터마이징 파일
- 사이트 정보: `src/config.ts`
- Astro 설정: `astro.config.ts`
- 전역 스타일: `src/styles/global.css`
