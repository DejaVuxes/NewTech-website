# Honda showroom models

Imported from the user's downloaded Sketchfab ZIP packages. Original downloads
remain in Downloads. These are third-party models, not models made by NewTech.

| Web file | Model | Creator | Source | License |
| --- | --- | --- | --- | --- |
| civic-rs.glb | Honda Civic RS | geyges | https://sketchfab.com/3d-models/honda-civic-rs-24cdb4612a394cf4827326dbad0126a5 | Sketchfab Free Standard |
| cr-v.glb | Honda CR-V (2026) | geyges | https://sketchfab.com/3d-models/honda-cr-v-2026-806e25ce44ed441c93ef265dcfe135f9 | Sketchfab Free Standard |
| hr-v.glb | Honda Vezel RS (HR-V) | geyges | https://sketchfab.com/3d-models/honda-vezel-rs-hr-v-c324676fb14b4effafe5eacb45d2d415 | Sketchfab Free Standard |
| pcx.glb | Honda PCX | DevanirGrau | https://sketchfab.com/3d-models/honda-pcx-cb4b2c153e204b88bd3848af1157eb47 | CC BY 4.0 |
| twister-300.glb | Honda Twister 300 | DevanirGrau | https://sketchfab.com/3d-models/honda-twister-300-00113e0c1e724703ab14ebaaeb9aa1c5 | Sketchfab Free Standard |
| cb500x.glb | Honda CB500X | DevanirGrau | https://sketchfab.com/3d-models/honda-cb500x-c2e1bff4afa34fc0b1957a5c418d666a | CC BY 4.0 |

License links:
- Sketchfab Free Standard: https://sketchfab.com/licenses
- CC BY 4.0: https://creativecommons.org/licenses/by/4.0/

Changes: optimized using glTF Transform 4.5.1 (deduplication, mesh joining,
simplification, Meshopt compression, WebP textures capped at 1024 px). The web
viewer centres and scales each model and changes selected body/rim material
colours. Original details, glass, logos and other materials are retained.

Only the selected vehicle is loaded; models are not all preloaded on arrival.
Sizes, in decimal MB: Civic 22.50 -> 2.44; CR-V 17.11 -> 3.06;
HR-V 88.81 -> 7.03; PCX 14.29 -> 1.86; Twister 31.04 -> 6.30;
CB500X 29.87 -> 5.92.

The original IDs s3, x5, gt, u125, st300 and c650 are retained for existing query
links. Twister replaces Street 300 (st300); CB500X replaces Cafe 650 (c650).
All six vehicles now use imported models.

Vehicle data is for a demonstration, not a sales quotation. Regional variants
can differ from the models depicted, especially Vezel vs Vietnamese HR-V RS.
Reference sources:
- https://www.honda.com.vn/o-to/san-pham/honda-civic/
- https://www.honda.com.vn/o-to/san-pham/honda-crv/
- https://www.honda.com.vn/o-to/san-pham/honda-hrv/index.html
- https://www.honda.com.vn/o-to/bang-gia-xe
- https://motos.honda.com.ar/uploads/modelos/55/fichas_tecnicas/55c-0ficha-tecnica-pcx-160.pdf
- https://saladeimprensa.honda.com.br/releases/honda-cb-300f-twister-2023-novo-design-motor-atualizado-e-mesma-confiabilidade
- https://www.honda.com.br/pos-venda/motos/sites/customer_service_motos/files/manuais/MP%20CB%20300F%20Twister%20ABS-CBS%20%282024%29%20D2203-MAN-1340_WEB.pdf
- https://www.astra-honda.com/hondabigbike/product/cruiser/honda-cb500x

Optimization can be reproduced from extracted originals with:

```
npx --yes --package=@gltf-transform/cli@4.5.1 gltf-transform optimize INPUT.glb OUTPUT.glb --compress meshopt --texture-compress webp --texture-size 1024 --simplify-ratio RATIO --simplify-error ERROR --palette false --instance false
```

RATIO / ERROR: Civic 0.7 / 0.0005; CR-V, PCX, Twister and CB500X 0.6 / 0.0005;
HR-V 0.3 / 0.001.
