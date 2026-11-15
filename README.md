# hushouyue.github.io

Personal site of Shouyue (Bruce) Hu, built with [al-folio](https://github.com/alshedivat/al-folio) (Jekyll).

## Local preview

```bash
export PATH=/opt/homebrew/opt/ruby/bin:$PATH
bundle install          # first time only
bundle exec jekyll serve --livereload --port 4001
# open http://localhost:4001
```

## Where to edit

- `_pages/about.md` — bio on the home page
- `_news/` — one file per news item
- `_projects/` — one file per project (`category: research` or `engineering`)
- `_bibliography/papers.bib` — publications (`selected = {true}` shows on home page)
- `_data/cv.yml` — CV page
- `_pages/art.md` — art page
- `_data/socials.yml` — contact links

Deploy: pushing to `main` runs `.github/workflows/deploy.yml`, which builds into the `gh-pages` branch.
GitHub Pages must be set to serve from `gh-pages`.
