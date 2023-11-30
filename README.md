# DIPS EHR APP

Web based portal to present DIPS EHR as micro front ends.


## Helm commands to remember


Generate template for preview with release-name and mydomain.com to file manifest.yaml:
```
helm template --name-template=release-name --set domain=mydomain.com . > manifest.yaml
```

Install template with release-name and mydomain.com:
```
helm install release-name --set domain=mydomain.com .
```