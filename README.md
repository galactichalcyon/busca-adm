# Busca de cursos de Administração em SP

Site estático: abra `index.html` no navegador ou publique a pasta no GitHub Pages.

- `index.html`, `style.css`, `app.js`: página e lógica de ranking.
- `dados.js`: dados dos cursos e coordenadas dos municípios (gerado).
- `dados/cursos_emec.csv`: base original do e-MEC.
- `scripts/gerar_dados.py`: regera o `dados.js` a partir do CSV (`python scripts/gerar_dados.py`). Requer `pandas`.

Onde mexer depois:
- Mensalidade: no `app.js`, a linha `const sp=1-x.p;` usa 0 para público e 1 para privado. Troque pelo preço normalizado quando a base de mensalidades existir.
- Instituições "Especial" gratuitas: preencha `ESPECIAL_GRATUITAS` no script.
