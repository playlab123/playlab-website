# Editing PlayLab

The site's content lives in Markdown (`.md`) files. You can edit those files directly on GitHub or in any text editor. Jekyll turns them into the website; you do not need to edit JavaScript to update content.

| What to edit | Where |
| --- | --- |
| Home introduction, headline, and contact text | `index.md` |
| Research directions | `_research/` |
| Publications | `_publications/` |
| Current members | `_people/` |
| Alumni | `_alumni/` |
| Lab news | `_news/` |
| Lab name, institution, and profile links | `_config.yml` |

## Edit an existing entry

Open its Markdown file. The fields between the two `---` lines describe the entry. Write the biography, summary, or announcement below the second `---` line using ordinary Markdown.

For example, a member file looks like this:

```markdown
---
order: 5
name: "Student Name"
role: "Undergraduate Research Assistant"
photo: "images/team/student-name.jpg"
website: "https://example.com/"
---

Write the student's biography here.

You can use **bold**, *italics*, and [links](https://example.com/).
```

Keep the opening and closing `---` lines. Put text fields in double quotes, especially when they contain a colon. If the text contains a double quote, escape it as `\"`, or use single quotes around the field instead.

The `order` number controls position within each section: smaller numbers appear first. Use distinct numbers within a folder. Filenames are descriptive labels and do not determine the display order.

## Add or remove content

To add an entry, copy an existing `.md` file in the appropriate folder, give it a new filename, and edit the fields and body. Choose the next `order` number, or adjust the existing numbers to place it earlier.

To move a member to Alumni, move their file from `_people/` to `_alumni/` and update their role and order.

To remove an entry, delete its Markdown file. Delete its image only after checking that no other entry uses it.

## Publications

Copy a file in `_publications/`. Keep the title, authors, venue, paper link (`doi`), and `category` fields. The summary goes in the Markdown body. Use one of these categories so the publication filters work:

- `learning`
- `authoring`
- `interaction`

The `image` and `video` fields are optional. Delete their lines if they are not needed. Paper links may point to a DOI, publisher, or another online copy; local PDFs are not required.

## News

Copy a file in `_news/`. Use `display_date` for a readable label such as `"Summer 2026"`. Write the announcement in the body, including bullet lists if needed.

A news image is optional. When adding one, include both `image` and descriptive `image_alt` fields. The `link` and `link_label` fields are also optional.

## Images

Only images displayed on the site are kept. Team photos live in `images/team/`; the faculty portrait, publication images, and REU photo live in `images/playlab/`.

Use paths relative to the repository root, such as `"images/team/student-name.jpg"`. Match capitalization exactly so the path also works on GitHub Pages. A person's `photo` field is optional: without it, the site displays their initials.

## Preview locally

Install Ruby with its development tools and Bundler. On Windows, use RubyInstaller **with Devkit**. From the project folder, run:

```sh
bundle install
bundle exec jekyll serve
```

Open <http://localhost:4000/playlab-website/>. Content edits rebuild automatically; restart the server after changing `_config.yml`.

To build without starting a server:

```sh
bundle exec jekyll build
```

The generated site goes into `_site/`, which is ignored by Git.

## GitHub Pages

This repository uses Jekyll. In the repository's **Settings → Pages**, use **Deploy from a branch**, select the branch containing these files, and choose **/(root)**. Saving or merging edits into that publishing branch triggers a build. A custom deployment pipeline must run Jekyll and publish `_site/`.

The current configuration uses the default repository address, <https://playlab123.github.io/playlab-website/>. If the website moves to a different repository path, set `baseurl` in `_config.yml` to that path, for example `"/playlab-website"`. Leave it empty for a root domain. Set `url` to the site's domain when known. Image, stylesheet, and script paths automatically include `baseurl`.

Preview a repository path locally with:

```sh
bundle exec jekyll serve --baseurl /playlab-website
```

Then open <http://localhost:4000/playlab-website/>.

Do not add a `.nojekyll` file: it would disable the Markdown build when publishing from a branch.

## Design files

The page layout is `_layouts/default.html`, the reusable member card is `_includes/person.html`, and styling is in `assets/playlab/style.css`. JavaScript only handles publication filters, the mobile menu, and device theme preferences. All content is available without JavaScript.

The unused physics template, sample posts, sample PDFs, unused images, and unused fonts have been removed.
