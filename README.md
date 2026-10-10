# RootFlav Homepage Prototype

A responsive, single-page front-end prototype for the RootFlav spices brand. Open `index.html` in a modern browser to preview it. The page uses plain HTML, CSS, and JavaScript; there is no build step or framework dependency.

## Readability refinement (revision 2)

This revision improves small-text legibility, slightly relaxes tight headline letter spacing, makes buttons and form controls easier to read, and uses gently softened corners on image frames and interactive elements. On mobile, featured product cards stack vertically so pack selectors and descriptions are less cramped. The overall cream / forest-green / turmeric / terracotta direction remains unchanged.

## Included

- Responsive desktop, tablet, and mobile layouts
- Wordmark-only RootFlav header and navigation
- Hero, values, six spice categories, featured product preview cards, brand story, journal, wholesale, export, transparency, newsletter, enquiry form, and footer
- Interactive spice search, mobile menu, demo shopping bag, enquiry preselection, and form validation/feedback
- Accessibility basics: skip link, semantic landmarks, labelled fields, keyboard focus states, reduced-motion support, and descriptive image text
- SEO title, description, and social sharing metadata

## Important setup before launch

This is a front-end prototype, not a connected ecommerce store. It does not accept payments, send emails, save newsletter subscribers, or transmit enquiry forms.

Before production launch:

1. Connect product catalogue data including actual names, Whole/Powdered variants, confirmed pack sizes, price, SKU, stock status, ingredients, and photos.
2. Connect a cart and secure checkout from the selected ecommerce platform. The current bag deliberately labels itself a demo and has checkout disabled.
3. Connect the business enquiry form to a backend, CRM, or form service and configure spam protection and privacy handling.
4. Connect the newsletter form to a consent-aware email platform.
5. Add confirmed business email, phone, business address (if required), social links, policies, shipping/returns terms, and customer support details.
6. Replace example journal cards with completed articles and real destinations.
7. Review all product and regulatory copy against final packaging and market requirements.
8. Choose final hosting/domain, analytics and consent setup, canonical URL, sitemap, robots directives, and any structured data supported by the production catalogue.

## Photography and fonts

The prototype references remote photographs hosted by Unsplash and Google Fonts. An internet connection is needed to load those resources. If self-hosting images, confirm each image's usage and licence requirements, download approved source files, and update the image paths. The page uses generic photo references for art direction; final RootFlav product photography should replace these before launch.

## Suggested integration path

Choose a platform first (for example Shopify or WooCommerce for a conventional catalogue/cart/checkout), then migrate the content and visual system into its theme or connect the front end to its product and checkout APIs. The prototype intentionally avoids fabricated prices, certifications, customer reviews, export destinations, and fulfilment promises.

### Prototype image references

The image references currently point to Unsplash-hosted photos for visual direction. Verify each image's current licence and terms before production use, and preferably replace them with original RootFlav product/lifestyle photography:

- [Assorted spices on wood — Marion Botella](https://unsplash.com/photos/cinnamon-sticks-and-assorted-culinary-spices-uaHShoIDGeo)
- [Spices and herbs in wooden bowls — Vincent Bélanger](https://unsplash.com/photos/spices-and-herbs-in-wooden-bowls-on-a-table-3gmr5ez2otU)
- [Flat-lay ingredients — Joanna Kosinska](https://unsplash.com/photos/flat-lay-photography-of-spices-on-plate-i0IvwAhhGZM)
- [Black peppercorns — Bambang Nugroho](https://unsplash.com/photos/whole-black-peppercorns-in-a-wooden-bowl-UPykgofCv8s)
- [Cinnamon sticks — Marek Studzinski](https://unsplash.com/photos/a-white-bowl-filled-with-cinnamon-sticks-on-top-of-a-table-PHlFlH-TxCE)
- [Turmeric powder and roots — iKshana Productions](https://unsplash.com/photos/a-bowl-of-turmeric-powder-with-roots-and-leaves-FNGJ69dNpck)
- [Cardamom and saffron — Mohammad Amiri](https://unsplash.com/photos/cardamom-pods-and-saffron-threads-in-spoons-K1UOAJ8XgaA)
- [Cinnamon, star anise, and cloves — Asli Dokuzeylul](https://unsplash.com/photos/cinnamon-sticks-star-anise-cloves-and-dried-flowers-JV34_07dGZo)
