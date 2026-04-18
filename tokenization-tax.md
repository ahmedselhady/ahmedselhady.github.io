When you prompt an LLM in English, a sentence like *"The quick brown fox"* typically costs 5 tokens. The same semantic content in many African or Southeast Asian languages can cost 3–5× more. This isn't a bug — it's a consequence of how subword tokenizers are trained.

## Why this happens

Most popular LLMs use a byte-pair encoding (BPE) tokenizer trained predominantly on English and a handful of European languages. The vocabulary it learns reflects that distribution: common English morphemes get their own token, while entire words in Yoruba or Thai might be encoded character-by-character.

> The practical consequence: if you're using a commercial API, you're paying 3–5× more per query in your language. If you're computing perplexity, your numbers aren't comparable across languages.

## What can we do about it?

Several directions are being explored: language-balanced training corpora for tokenizers, adaptive vocabularies that expand for non-English languages, and fertility-aware evaluation metrics that account for tokenization disparities. My own work explores the third direction — but the problem is ultimately upstream: we need better tokenizers, trained on more balanced data.

The good news is that awareness is growing. The bad news is that most labs optimize tokenizers for English-centric benchmarks, so the incentive to fix this is weak. Until that changes, this "tokenization tax" remains a quiet form of linguistic discrimination baked into the infrastructure of AI.
