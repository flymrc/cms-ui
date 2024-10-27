
type MetadataKey = PropertyKey;

declare namespace Annotations {
    // function getMetadataKey(target: Object): undefined | symbol
    function metadata(metadataKey: MetadataKey, metadataValue: any)
    function getMetadata<R = any>(metadataKey: MetadataKey, target: Object, propertyKey: PropertyKey): R | undefined
}