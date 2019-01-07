# rest-client <!-- omit in toc -->

Client for [`foxify-restify-odin`](https://github.com/foxifyjs/foxify-restify-odin) package

[![Npm Version](https://img.shields.io/npm/v/rest-client.svg)](https://www.npmjs.com/package/rest-client)
[![TypeScript Version](https://img.shields.io/npm/types/rest-client.svg)](https://www.typescriptlang.org)
[![Package Quality](https://npm.packagequality.com/shield/rest-client.svg)](https://packagequality.com/#?package=rest-client)
[![Npm Total Downloads](https://img.shields.io/npm/dt/rest-client.svg)](https://www.npmjs.com/package/rest-client)
[![Npm Monthly Downloads](https://img.shields.io/npm/dm/rest-client.svg)](https://www.npmjs.com/package/rest-client)
[![Open Issues](https://img.shields.io/github/issues-raw/foxifyjs/rest-client.svg)](https://github.com/foxifyjs/rest-client/issues?q=is%3Aopen+is%3Aissue)
[![Closed Issues](https://img.shields.io/github/issues-closed-raw/foxifyjs/rest-client.svg)](https://github.com/foxifyjs/rest-client/issues?q=is%3Aissue+is%3Aclosed)
[![Known Vulnerabilities](https://snyk.io/test/github/foxifyjs/rest-client/badge.svg?targetFile=package.json)](https://snyk.io/test/github/foxifyjs/rest-client?targetFile=package.json)
[![Dependencies Status](https://david-dm.org/foxifyjs/rest-client.svg)](https://david-dm.org/foxifyjs/rest-client)
[![Pull Requests](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://github.com/foxifyjs/rest-client/pulls)
[![License](https://img.shields.io/github/license/foxifyjs/rest-client.svg)](https://github.com/foxifyjs/rest-client/blob/master/LICENSE)
[![Build Status](https://api.travis-ci.com/foxifyjs/rest-client.svg?branch=master)](https://travis-ci.com/foxifyjs/rest-client)
[![Github Stars](https://img.shields.io/github/stars/foxifyjs/rest-client.svg?style=social&label=Stars)](https://github.com/foxifyjs/rest-client)
[![Github Forks](https://img.shields.io/github/forks/foxifyjs/rest-client.svg?style=social&label=Fork)](https://github.com/foxifyjs/rest-client)

## Table on Contents <!-- omit in toc -->

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Client.setProxy()](#clientsetproxy)
    - [Client.setAPI()](#clientsetapi)
    - [Client.setToken()](#clientsettoken)
    - [Client.setQSOptions()](#clientsetqsoptions)
    - [client](#client)
    - [client.setProxy()](#clientsetproxy)
    - [client.setAPI()](#clientsetapi)
    - [client.setToken()](#clientsettoken)
    - [client.setQSOptions()](#clientsetqsoptions)
    - [client.count()](#clientcount)
    - [client.index()](#clientindex)
    - [client.show()](#clientshow)
    - [client.store()](#clientstore)
    - [client.update()](#clientupdate)
    - [client.delete()](#clientdelete)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)
- [Support](#support)

## Getting Started

### Prerequisites

`npm i axios prototyped.js qs`

> if you're using typescript:

`npm i -D @types/axios @types/qs`

### Installation

`npm i @foxify/rest-client`

### Usage

```javascript
const Client = require("@foxify/rest-client");
```

#### Client.setProxy()

Sets global proxy

```javascript
Client.proxy({
  host: "host",
  port: 8080,
  auth: { // not required
    username: "username",
    password: "password",
  }
});
```

#### Client.setAPI()

Sets global API address

```javascript
Client.setAPI("https://your_api_address");
```

#### Client.setToken()

Sets global API token

```javascript
Client.setToken("your bearer token");
```

#### Client.setQSOptions()

Sets global QS.stringify options

```javascript
Client.setQSOptions({ ... });
```

#### client

Create a new instance

```javascript
const client = new Client();
```

#### client.setProxy()

Sets instance's proxy

```javascript
Client.proxy({
  host: "host",
  port: 8080,
  auth: { // not required
    username: "username",
    password: "password",
  }
});
```

#### client.setAPI()

Sets instance's API address

```javascript
Client.setAPI("https://your_api_address");
```

#### client.setToken()

Sets instance's API token

```javascript
Client.setToken("your bearer token");
```

#### client.setQSOptions()

Sets instance's QS.stringify options

```javascript
Client.setQSOptions({ ... });
```

#### client.count()

```typescript
class Client<T extends object = any> {
  public count(resource: string): Count<T>;
  public count(prefix: string, resource: string): Count<T>;
}
```

Requests \[GET\] `/{resource}/count` or `/{prefix}/{resource}/count`

Returns an instance of [Count](Count.md)

#### client.index()

```typescript
class Client<T extends object = any> {
  public index<R extends string>(resource: R): Index<T, R>;
  public index<R extends string>(prefix: string, resource: R): Index<T, R>;
}
```

Requests \[GET\] `/{resource}` or `/{prefix}/{resource}`

Returns an instance of [Index](Index.md)

#### client.show()

```typescript
class Client<T extends object = any> {
  public show(resource: string): Show<T>;
  public show(prefix: string, resource: string): Show<T>;
}
```

Requests \[GET\] `/{resource}/{id}` or `/{prefix}/{resource}/{id}`

Returns an instance of [Show](Show.md)

#### client.store()

```typescript
class Client<T extends object = any> {
  public store(resource: string, data: T): Promise<T>;
  public store(prefix: string, resource: string, data: T): Promise<T>;
  public store(resource: string, data: T, callback: Client.Callback<T>): void;
  public store(prefix: string, resource: string, data: T, callback: Client.Callback<T>): void;
}
```

Requests [POST] `/{resource}` or `/{prefix}/{resource}` by the given resource data

Results an object which is the stored resource

#### client.update()

```typescript
class Client<T extends object = any> {
  public update(resource: string, id: string, data: Partial<T>): Promise<T>;
  public update(prefix: string, resource: string, id: string, data: Partial<T>): Promise<T>;
  public update(resource: string, id: string, data: Partial<T>, callback: Client.Callback<T>): void;
  public update(prefix: string, resource: string, id: string, data: Partial<T>, callback: Client.Callback<T>): void;
}
```

Requests [PATCH] `/{resource}/{id}` or `/{prefix}/{resource}/{id}` by the given resource data

Results an object which is the updated resource

#### client.delete()

```typescript
class Client<T extends object = any> {
  public delete(path: string, id: string): Promise<string>;
  public delete(path: string, id: string, callback: Client.Callback<string>): void;
}
```

Requests [DELETE] `/{resource}/{id}` or `/{prefix}/{resource}/{id}`

Results a message

## Versioning

We use [SemVer](http://semver.org) for versioning. For the versions available, see the [tags on this repository](https://github.com/foxifyjs/rest-client/tags).

## Authors

- **Ardalan Amini** - *Owner/Developer* - [@ardalanamini](https://github.com/ardalanamini)

See also the list of [contributors](https://github.com/foxifyjs/rest-client/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Support

If my work helps you, please consider

[![Become A Patron](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/ardalanamini)

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/ardalanamini)
